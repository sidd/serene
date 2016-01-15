import BodyContainer from './BodyContainer'
import HeaderContainer from './HeaderContainer'
import FooterContainer from './FooterContainer'
import ModalContainer from './ModalContainer'
import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import TorrentInfo from 'components/Torrent/TorrentInfo'
import { appSelector } from 'selectors'
import { connect } from 'react-redux'
import { isEmpty } from 'utils'
import { getProviders } from 'actions/ProviderActions'
import { promptConnection } from 'actions/ConnectionActions'
import { unsetModal } from 'actions/ModalActions'
import { buildTorrentsModal, setTorrent, setTorrentsToUpload, unsetTorrent, removeTorrent, updateTorrentStatus } from 'actions/TorrentActions'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

require('./styles/App')

const AppContainer = React.createClass({
  getInitialState () {
    return {
      isDropdownOpen: false
    }
  },

  propTypes: {
    dispatch: PropTypes.func.isRequired,
    controllers: PropTypes.object,
    modal: PropTypes.object,
    selectedConnection: PropTypes.object,
    selectedTorrent: PropTypes.object
  },

  componentWillMount () {
    const { selectedConnection, dispatch } = this.props
    if (isEmpty(selectedConnection)) {
      dispatch(getProviders())
      dispatch(promptConnection())
    }
  },

  handleDropdownToggle () {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen })
  },

  /**
   * Dispatches `unsetModal()` if modal suceeded, or the modal isn't required.
   *
   * @param {Boolean} modalDidSucceed Whether the modal's action was successful
   */
  unsetModal (modalDidSucceed) {
    const { modal, dispatch } = this.props
    if (modalDidSucceed || !modal.required) {
      dispatch(unsetModal())
    }
  },

  /**
   * Deselects the currently selected torrent.
   */
  unsetTorrent () {
    this.props.dispatch(unsetTorrent())
  },

  /**
   * Selects torrent specified by `infohash`.
   *
   * @param {String} infohash Torrent to select.
   */
  setTorrent (infohash, ev) {
    if (ev) ev.stopPropagation()
    this.props.dispatch(setTorrent(infohash))
  },

  /**
   * Dispatches update to a torrent's status (i.e. start/pause/stop)
   *
   * @param {String} options.infohash Torrent to update.
   * @param {String} options.status   Specifies torrent's new status.
   */
  handleStatusClick ({ infohash, status }) {
    const { dispatch } = this.props
    dispatch(updateTorrentStatus(infohash, status))
  },

  /**
   * Dispatches torrent removal.
   *
   * @param {String} infohash Torrent to remove.
   */
  handleRemoveClick (infohash) {
    this.props.dispatch(removeTorrent(infohash))
  },

  /**
   * Shows modal torrent upload form.
   */
  handleAddTorrentClick () {
    this.props.dispatch(buildTorrentsModal(this.handleTorrentsDrop))
  },

  handleAddConnectionClick () {
    this.props.dispatch(promptConnection(false))
  },

  handleTorrentsDrop (files) {
    files = [].slice.call(files)
    var isInvalid = false

    files.forEach(file => {
      if (file.type !== 'application/x-bittorrent') {
        isInvalid = true
      }
    })

    if (!isInvalid) this.props.dispatch(setTorrentsToUpload(files))
  },

  render () {
    const { selectedTorrent, modal, selectedConnection } = this.props

    return (
      <ReactCSSTransitionGroup
        component='div'
        className='app'
        transitionName='app-transition'
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}>
        {!isEmpty(modal || {}) &&
          <ModalContainer modal={modal} unsetModal={this.unsetModal} />
        }
        <HeaderContainer
          handleDropdownToggle={this.handleDropdownToggle}
          isDropdownOpen={this.state.isDropdownOpen}
          handleAddTorrentClick={this.handleAddTorrentClick}
          handleAddConnectionClick={this.handleAddConnectionClick} />
        {!isEmpty(selectedConnection) &&
          <BodyContainer
            handleTorrentsDrop={this.handleTorrentsDrop}
            controller={selectedConnection}
            setTorrent={this.setTorrent}
            unsetTorrent={this.unsetTorrent}
            isDropdownOpen={this.state.isDropdownOpen} />
        }
        {!!selectedTorrent && !isEmpty(selectedTorrent) &&
          <TorrentInfo
            unsetTorrent={this.unsetTorrent}
            torrent={selectedTorrent} />
        }
        {!isEmpty(selectedConnection) &&
          <FooterContainer
            handleRemoveClick={this.handleRemoveClick}
            handleStatusClick={this.handleStatusClick}
            controller={selectedConnection}
            selectedTorrent={selectedTorrent} />
        }
      </ReactCSSTransitionGroup>
    )
  }
})
export default DragDropContext(HTML5Backend)(connect(appSelector)(AppContainer))

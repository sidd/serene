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
import { setTorrent, unsetTorrent, removeTorrent, updateTorrentStatus } from 'actions/TorrentActions'

require('./styles/App')

const AppContainer = React.createClass({
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
    const { dispatch } = this.props
    dispatch(removeTorrent(infohash))
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
        <HeaderContainer />
        {!isEmpty(selectedConnection) &&
          <BodyContainer
            controller={selectedConnection}
            setTorrent={this.setTorrent}
            unsetTorrent={this.unsetTorrent} />
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
export default connect(appSelector)(AppContainer)

import AddTorrentModal from 'components/Torrent/AddTorrentModal'
import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Sidebar from 'components/Sidebar/Sidebar'
import TorrentList from 'components/Torrent/TorrentList'
import { bodySelector } from 'selectors'
import { buildModal } from 'actions/ModalActions'
import { connect } from 'react-redux'
import { sortTorrents } from 'actions/TorrentActions'
import { promptConnection } from 'actions/ConnectionActions'

require('./styles/Body')

const BodyContainer = React.createClass({
  propTypes: {
    controller: PropTypes.object,
    connectionsSelected: PropTypes.string,
    dispatch: PropTypes.func,
    torrents: PropTypes.array,
    selectedTorrent: PropTypes.object,
    setTorrent: PropTypes.func,
    unsetTorrent: PropTypes.func,
    torrentsIsSorted: PropTypes.bool
  },

  /**
   * Shows modal torrent upload form.
   */
  handleAddClick () {
    this.props.dispatch(buildModal({
      title: 'Add Torrent',
      body: AddTorrentModal
    }))
  },

  handleAddConnectionClick () {
    this.props.dispatch(promptConnection())
  },

  handleTorrentListHeaderClick (ev) {
    ev.preventDefault()
    this.props.dispatch(sortTorrents(ev.target.getAttribute('name')))
  },

  render () {
    const { torrentsIsSorted, setTorrent, unsetTorrent, dispatch, selectedTorrent, torrents } = this.props

    return (
      <ReactCSSTransitionGroup
            component='section'
            className='app__body'
            transitionName='body-transition'
            transitionEnter={true}
            transitionEnterTimeout={200}
            transitionLeave={true}
            transitionLeaveTimeout={200}>
        <Sidebar
          handleAddClick={this.handleAddClick}
          handleAddConnectionClick={this.handleAddConnectionClick} />
        <TorrentList
          handleTorrentListHeaderClick={this.handleTorrentListHeaderClick}
          selectedTorrent={selectedTorrent}
          isSorted={torrentsIsSorted}
          torrents={torrents}
          dispatch={dispatch}
          unsetTorrent={unsetTorrent}
          setTorrent={setTorrent} />
      </ReactCSSTransitionGroup>
    )
  }
})

export default connect(bodySelector)(BodyContainer)

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Sidebar from '../components/Sidebar'
import TorrentList from '../components/TorrentList'
import TorrentInfo from '../components/TorrentInfo'
import { buildModal } from '../actions/ModalActions'
import { unsetTorrent, getTorrents, removeTorrent, updateTorrentStatus, setTorrent } from '../actions/TorrentActions'
import { isEmpty } from '../utils'
import AddTorrentModal from '../components/AddTorrentModal'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { bodySelector } from '../selectors'

const BodyContainer = React.createClass({
  propTypes: {
    controller: PropTypes.object,
    dispatch: PropTypes.func,
    torrents: PropTypes.array,
    selectedTorrent: PropTypes.object
  },

  componentWillMount () {
    this.props.dispatch(getTorrents(true))
  },

  setTorrent (torrent, ev) {
    if (ev) ev.stopPropagation()
    this.props.dispatch(setTorrent(torrent.infohash))
  },

  unsetTorrent () {
    this.props.dispatch(unsetTorrent())
  },

  handleAddClick () {
    this.props.dispatch(buildModal({
      title: 'Add Torrent',
      body: AddTorrentModal
    }))
  },

  handleStatusClick ({ infohash, status }) {
    const { dispatch } = this.props
    dispatch(updateTorrentStatus(infohash, status))
  },

  handleRemoveClick (infohash) {
    const { dispatch } = this.props
    dispatch(removeTorrent(infohash))
  },

  render () {
    const { dispatch, selectedTorrent, torrents } = this.props

    return (
      <ReactCSSTransitionGroup
            component='section'
            className='app__body'
            transitionName='body-transition'
            transitionEnter={true}
            transitionEnterTimeout={150}
            transitionLeave={true}
            transitionLeaveTimeout={150}>
        <Sidebar
          handleAddClick={this.handleAddClick} />
        <TorrentList
          selectedTorrent={selectedTorrent}
          torrents={torrents}
          dispatch={dispatch}
          unsetTorrent={this.unsetTorrent}
          setTorrent={this.setTorrent} />
        {!!selectedTorrent &&
        !isEmpty(selectedTorrent) &&
          <TorrentInfo
            handleStatusClick={this.handleStatusClick}
            handleRemoveClick={this.handleRemoveClick}
            torrent={selectedTorrent} />
        }
      </ReactCSSTransitionGroup>
    )
  }
})

export default connect(bodySelector)(BodyContainer)

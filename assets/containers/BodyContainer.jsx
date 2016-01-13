import cx from 'classnames'
import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import TorrentList from 'components/Torrent/TorrentList'
import { setTorrentsToUpload, sortTorrents } from 'actions/TorrentActions'
import { bodySelector } from 'selectors'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import { NativeTypes } from 'react-dnd-html5-backend'
import { promptConnection } from 'actions/ConnectionActions'

require('./styles/Body')

const bodyTarget = {
  drop (_, monitor, component) {
    const files = monitor.getItem().files
    component.handleTorrentsDrop(files)
  }
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

const BodyContainer = React.createClass({
  propTypes: {
    controller: PropTypes.object,
    connectionsSelected: PropTypes.string,
    connectDropTarget: PropTypes.func.isRequired,
    dispatch: PropTypes.func,
    isOver: PropTypes.bool,
    torrents: PropTypes.array,
    selectedTorrent: PropTypes.object,
    setTorrent: PropTypes.func,
    unsetTorrent: PropTypes.func,
    torrentsIsSorted: PropTypes.bool,
    torrentsIsSortedByDescending: PropTypes.bool,
    torrentsSortedBy: PropTypes.string
  },

  /**
   * Shows modal torrent upload form.
   */
  handleAddClick () {
  },

  handleAddConnectionClick () {
    this.props.dispatch(promptConnection())
  },

  handleTorrentListHeaderClick (ev) {
    ev.preventDefault()
    this.props.dispatch(sortTorrents(ev.currentTarget.getAttribute('name')))
  },

  handleTorrentsDrop (files) {
    var isInvalid = false

    files.forEach(file => {
      if (file.type !== 'application/x-bittorrent') {
        isInvalid = true
      }
    })

    if (!isInvalid) this.props.dispatch(setTorrentsToUpload(files))
  },

  render () {
    const { isOver, connectDropTarget, torrentsIsSortedByDescending, torrentsSortedBy, torrentsIsSorted, setTorrent, unsetTorrent, dispatch, selectedTorrent, torrents } = this.props

    return (
      <ReactCSSTransitionGroup
            component='section'
            className={cx('app__body', {
              'app__body--drop-active': isOver
            })}
            transitionName='body-transition'
            transitionEnter
            transitionEnterTimeout={200}
            transitionLeave
            transitionLeaveTimeout={200}
            ref={instance => connectDropTarget(findDOMNode(instance))}>
        {/* <Sidebar
          handleAddClick={this.handleAddClick}
          handleAddConnectionClick={this.handleAddConnectionClick} /> */}
        <TorrentList
          handleTorrentListHeaderClick={this.handleTorrentListHeaderClick}
          selectedTorrent={selectedTorrent}
          sortedBy={torrentsSortedBy}
          isSorted={torrentsIsSorted}
          isSortedByDescending={torrentsIsSortedByDescending}
          torrents={torrents}
          dispatch={dispatch}
          unsetTorrent={unsetTorrent}
          setTorrent={setTorrent} />
      </ReactCSSTransitionGroup>
    )
  }
})

export default connect(bodySelector)(DropTarget(NativeTypes.FILE, bodyTarget, collect)(BodyContainer))

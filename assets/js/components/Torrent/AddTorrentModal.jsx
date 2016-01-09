import React, { PropTypes } from 'react'
import { addTorrent } from 'actions/TorrentActions'
import { connect } from 'react-redux'
import { NativeTypes } from 'react-dnd-html5-backend'
import { DropTarget } from 'react-dnd'

const modalTarget = {
  drop (props, monitor, component) {
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

const AddTorrentModal = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    unsetModal: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
  },

  handleTorrentsDrop (files) {
    var isInvalid = false
    files.forEach(file => {
      if (file.type !== 'application/x-bittorrent') {
        isInvalid = true
      }
    })
    if (!isInvalid) this.props.dispatch(addTorrent(files))
  },

  render () {
    const { connectDropTarget } = this.props

    return connectDropTarget(
      <div className='modal--torrent'>
        Drag torrent(s) here
      </div>
    )
  }
})

export default connect(state => state)(DropTarget(NativeTypes.FILE, modalTarget, collect)(AddTorrentModal))

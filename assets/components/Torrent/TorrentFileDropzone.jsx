import React, { PropTypes } from 'react'
import { DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

const torrentFileDropzoneTarget = {
  drop (props, monitor) {
    const files = monitor.getItem().files
    props.onFilesDrop(files)
  }
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

const TorrentFileDropzone = React.createClass({
  propTypes: {
    connectDropTarget: PropTypes.func.isRequired
  },

  render () {
    const { connectDropTarget } = this.props

    return connectDropTarget(
      <label className='parsed-torrent__uploader__label' htmlFor='parsed-torrent__uploader'>
        <span className='button parsed-torrent__uploader__text'>
          Choose torrent(s)...
        </span>
      </label>
    )
  }
})

export default DropTarget(NativeTypes.FILE, torrentFileDropzoneTarget, collect)(TorrentFileDropzone)

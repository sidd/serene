import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addTorrent } from '../actions/TorrentActions'

const AddTorrentModal = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    unsetModal: PropTypes.func.isRequired
  },

  getInitialState () {
    return {
      filename: null
    }
  },

  handleSubmit (ev) {
    ev.preventDefault()

    var reader = new window.FileReader()
    reader.onload = upload => {
      const result = upload.target.result
      this.props.dispatch(addTorrent(result.slice(37)))
      this.props.unsetModal()
    }

    reader.readAsDataURL(ev.target[0].files[0])
  },

  handleChange (ev) {
    this.setState({
      filename: ev.target.files.length
        ? ev.target.files[0].name
        : null
    })
  },

  render () {
    return (
      <div className='modal--torrent'>
        <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
          <p className='modal--torrent__filename'>{this.state.filename || 'Drag torrent files here'}</p>
          <input className='modal--torrent__file' type='file' name='torrent' onChange={this.handleChange} />
          {!!this.state.filename &&
            <button className='button' type='submit'>Upload</button>
          }
        </form>
      </div>
    )
  }
})

export default connect(state => state)(AddTorrentModal)

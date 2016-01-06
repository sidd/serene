import React, { PropTypes } from 'react'
import { addTorrent } from 'actions/TorrentActions'
import { connect } from 'react-redux'

const AddTorrentModal = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    unsetModal: PropTypes.func.isRequired
  },

  /**
   * Stores the filename of the currently added file.
   */
  getInitialState () {
    return {
      filename: null
    }
  },

  /**
   * Handles torrent upload submission. Utilizes FileReader API,
   * and makes naive assumptions about the type of file uploaded.
   *
   * @param {SyntheticEvent} [ev] event from React onSubmit prop
   * @see https://developer.mozilla.org/en-US/docs/Web/API/FileReader
   * @todo Formally check filetype.
   * @todo Handle multiple torrents simultaneously.
   */
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

  /**
   * Updates this component's state with current filename.
   *
   * @param {SyntheticEvent} ev event from React onChange prop
   * @todo use `parse-torrent` to generate more data than the filename.
   * @see https://www.npmjs.com/package/parse-torrent
   */
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

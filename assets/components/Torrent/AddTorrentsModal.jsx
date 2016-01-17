import React, { PropTypes } from 'react'
import { addTorrents, unsetTorrentsToUpload } from 'actions/TorrentActions'
import { connect } from 'react-redux'
import { isEmpty } from 'utils'
import { addTorrentsModalSelector } from 'selectors'
import bytes from 'bytes'
import TorrentFileDropzone from './TorrentFileDropzone'

require('./styles/AddTorrentsModal')

const AddTorrentsModal = React.createClass({
  propTypes: {
    torrents: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
    unsetModal: PropTypes.func.isRequired,
    onFilesDrop: PropTypes.func
  },

  handleSubmit (ev) {
    ev.preventDefault()
    const { unsetModal, dispatch, torrents } = this.props
    dispatch(addTorrents(torrents, () => {
      unsetModal(true)
      return unsetTorrentsToUpload()
    }))
  },

  componentWillUnmount () {
    this.props.dispatch(unsetTorrentsToUpload())
  },

  render () {
    const { torrents } = this.props

    return (
      <div>
        {torrents
          ? <div className='parsed-torrent__container'>
              <div className='parsed-torrent__torrents'>
                {!isEmpty(torrents || {}) && torrents.map(torrent =>
                  <div className='parsed-torrent__data' key={torrent.infoHash}>
                    <h3 className='parsed-torrent__data__heading'>{torrent.name}</h3>
                    <ul className='parsed-torrent__data__file__list'>
                      {torrent.files.map(file =>
                          <li className='parsed-torrent__data__file__item' key={file.offset}>
                            <span><i className='parsed-torrent__data__file__icon fa fa-file-o'></i>{file.name}</span>
                          </li>
                      )}
                    </ul>
                    <dl className='parsed-torrent__meta'>
                      <div className='parsed-torrent__meta__data'>
                        <dt className='parsed-torrent__meta__key'>Size</dt>
                        <dd className='parsed-torrent__meta__value'>{bytes(torrent.length)}</dd>
                      </div>
                      <div className='parsed-torrent__meta__data'>
                        <dt className='parsed-torrent__meta__key'>Private</dt>
                        <dd className='parsed-torrent__meta__value'>Yes</dd>
                      </div>
                    </dl>
                  </div>
                )}
              </div>
            </div>
          : <div>
              <input type='file' id='parsed-torrent__uploader' onChange={ev => this.props.onFilesDrop(ev.target.files)} multiple />
              <TorrentFileDropzone onFilesDrop={this.props.onFilesDrop} />
            </div>
        }
        {!!torrents &&
          <button className='button button--modal-submit parsed-torrent__submit' onClick={this.handleSubmit}>Upload</button>
        }
      </div>
    )
  }
})

export default connect(addTorrentsModalSelector)(AddTorrentsModal)

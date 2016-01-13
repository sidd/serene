import React, { PropTypes } from 'react'
import { addTorrent, unsetTorrentsToUpload } from 'actions/TorrentActions'
import { connect } from 'react-redux'
import { isEmpty } from 'utils'
import { addTorrentsModalSelector } from 'selectors'
import bytes from 'bytes'

require('./styles/AddTorrentsModal')

const AddTorrentsModal = React.createClass({
  propTypes: {
    torrents: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
    unsetModal: PropTypes.func.isRequired
  },

  handleSubmit (ev) {
    ev.preventDefault()
    const { unsetModal, dispatch, torrents } = this.props
    dispatch(addTorrent(torrents, () => {
      unsetModal(true)
      return unsetTorrentsToUpload()
    }))
  },

  render () {
    const { torrents } = this.props

    return (
      <div className='parsed-torrent__container'>
        <form onSubmit={this.handleSubmit}>
          <div className='parsed-torrent__torrents'>
            {!isEmpty(torrents || {}) && torrents.map(torrent =>
              <div className='parsed-torrent__data'>
                <h3 className='parsed-torrent__data__heading'>{torrent.name}</h3>
                <ul className='parsed-torrent__data__file__list'>
                  {torrent.files.map(file =>
                      <li className='parsed-torrent__data__file__item'>
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
          <button className='button parsed-torrent__submit' type='submit'>Upload</button>
        </form>
      </div>
    )
  }
})

export default connect(addTorrentsModalSelector)(AddTorrentsModal)

import React, { PropTypes } from 'react'
import bytes from 'bytes'
import TorrentInfoItem from './TorrentInfoItem'
import TorrentInfoItemContainer from './TorrentInfoItemContainer'

require('./styles/TorrentInfo')

export default React.createClass({
  propTypes: {
    torrent: PropTypes.object.isRequired,
    unsetTorrent: PropTypes.func.isRequired
  },

  /**
   * Deselects currently selected torrent.
   *
   * @param  {Object} ev `keydown` event.
   */
  _onKeyDown (ev) {
    if (ev.keyCode === 27) {
      ev.stopPropagation()
      this.props.unsetTorrent()
    }
  },

  /**
   * Begins listening for keydown events.
   */
  componentWillMount () {
    document.addEventListener('keydown', this._onKeyDown)
  },

  /**
   * Terminates listening for keydown events.
   */
  componentWillUnmount () {
    document.removeEventListener('keydown', this._onKeyDown)
  },

  render () {
    const { torrent } = this.props
    const { trackers, path, bytes_downloaded, bytes_uploaded, bytes_total, infohash } = torrent

    return (
      <div className='torrent-info__container' ref='root'>
        <div className='torrent-info torrent-info__details__container' ref='root'>
          <h3 className='torrent-info__name'>{torrent.name}</h3>
          <dl className='torrent-info__details'>
            <TorrentInfoItem
              label='Hash'
              value={infohash}
              valueModifier='monospace' />
            <TorrentInfoItem
              label='Size'
              value={bytes(+bytes_total)} />
            <TorrentInfoItem
              label='Path'
              value={path} />
            <TorrentInfoItemContainer>
              <TorrentInfoItem
                label='Downloaded'
                className='torrent-info__data--half'
                value={bytes(+bytes_downloaded)} />
              <TorrentInfoItem
                label='Uploaded'
                className='torrent-info__data--half'
                value={bytes(+bytes_uploaded)} />
            </TorrentInfoItemContainer>
            {trackers && <TorrentInfoItem
              label='Tracker'
              value={trackers[0].url} />}
          </dl>
        </div>
      </div>
    )
  }
})

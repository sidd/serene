import React, { PropTypes } from 'react'
import bytes from 'bytes'
import TorrentInfoItem from './TorrentInfoItem'
import TorrentInfoItemContainer from './TorrentInfoItemContainer'
import ComputedWidthTransitionMixin from '../mixins/ComputedWidthTransitionMixin'

export default React.createClass({
  propTypes: {
    torrent: PropTypes.object.isRequired,
    handleRemoveClick: PropTypes.func.isRequired,
    handleStatusClick: PropTypes.func.isRequired
  },

  mixins: [ComputedWidthTransitionMixin()],

  render () {
    const { handleRemoveClick, handleStatusClick, torrent } = this.props
    const { trackers, path, bytes_downloaded, bytes_uploaded, bytes_total, infohash } = torrent

    return (
        <section className='app__component app__component--info' ref='root'>
          <div className='torrent-info__container'>
            <div className='torrent-info torrent-info__actions'>
              <button
                className='button torrent-info__action'
                onClick={handleStatusClick.bind(null, {
                  infohash,
                  status: 'start'
                })}>
                <i className='fa fa-fw fa-play'></i>
                <span>&nbsp;Start</span>
              </button>
              <button
                className='button torrent-info__action'
                onClick={handleStatusClick.bind(null, {
                  infohash,
                  status: 'pause'
                })}>
                <i className='fa fa-fw fa-pause'></i>
                <span>&nbsp;Pause</span>
              </button>
              <button
                className='button torrent-info__action'
                onClick={handleStatusClick.bind(null, {
                  infohash,
                  status: 'stop'
                })}>
                <i className='fa fa-fw fa-stop'></i>
                <span>&nbsp;Stop</span>
              </button>
              <button
                className='button torrent-info__action'
                onClick={handleRemoveClick.bind(null, infohash)}>
                <i className='fa fa-fw fa-remove'></i>
                <span>&nbsp;Remove</span>
              </button>
            </div>
            <div className='torrent-info torrent-info__details__container'>
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
        </section>
    )
  }
})

import React, { PropTypes } from 'react'
import cx from 'classnames'
import bytes from 'bytes'
import ProgressBar from './ProgressBar'
import StatusIcon from './Icon/StatusIcon'
import { humanize } from '../utils'

export default React.createClass({
  propTypes: {
    active: PropTypes.bool,
    torrent: PropTypes.object.isRequired,
    setTorrent: PropTypes.func.isRequired
  },

  render () {
    const { setTorrent, torrent } = this.props
    const { is_hash_checking, bytes_remaining, is_open, is_active, download_speed, upload_speed, bytes_total, seeders, peers, ratio } = torrent

    // TODO: decouple from rtorrent :)
    var status
    switch (is_active) {
      case '0':
        status = +is_open ? 'paused' : 'stopped'
        break
      case '1':
        status = !+bytes_remaining ? 'uploading' : 'downloading'
        break
    }
    status = (is_hash_checking === '1') ? 'checking' : status

    var eta
    if (download_speed !== '0') {
      eta = humanize(+bytes_remaining / +download_speed, { round: true })
    }

    return (
      <tr
        className={cx('torrent-list__item', {
          'torrent-list__item--active': this.props.active
        })}
        onClick={setTorrent.bind(null, torrent)}>
        <td className='torrent-list__data torrent-list__data--title'>
          <StatusIcon
            className='torrent-list__status'
            status={status} />
          <span>{torrent.name}</span>
        </td>
        <td className='torrent-list__data torrent-list__data--completion'>
          <ProgressBar progress={(+torrent.bytes_downloaded / bytes_total * 100).toFixed(2) + '%'} />
        </td>
        <td className='torrent-list__data'>{bytes(+bytes_total)}</td>
        <td className='torrent-list__data'>{bytes(+download_speed)}/s</td>
        <td className='torrent-list__data'>{bytes(+upload_speed)}/s</td>
        <td className='torrent-list__data'>{seeders}</td>
        <td className='torrent-list__data'>{peers}</td>
        <td className='torrent-list__data'>{+bytes_remaining ? eta || '-' : <i className='fa fa-fw fa-check' />}</td>
        <td className='torrent-list__data'>{ratio}</td>
      </tr>
    )
  }
})

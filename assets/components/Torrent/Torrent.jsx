import React, { PropTypes } from 'react'
import cx from 'classnames'
import bytes from 'bytes'
import ProgressBar from 'components/ProgressBar/ProgressBar'
import StatusIcon from '../Icon/StatusIcon'
import { humanize } from '../../utils'
import { isEmpty } from 'utils'
import { parse } from 'url'

export default React.createClass({
  propTypes: {
    active: PropTypes.bool,
    torrent: PropTypes.object.isRequired,
    setTorrent: PropTypes.func.isRequired,
    unsetTorrent: PropTypes.func.isRequired,
    selectedTorrent: PropTypes.object
  },

  render () {
    const { unsetTorrent, selectedTorrent, setTorrent, torrent } = this.props
    const { status, infohash, name, bytes_downloaded, bytes_remaining, download_speed, upload_speed, bytes_total, num_seeders, num_peers, ratio } = torrent

    var eta
    if (download_speed !== '0') {
      eta = humanize(+bytes_remaining / +download_speed, { round: true })
    }

    return (
      <tr
        className={cx('torrent-list__item', {
          'torrent-list__item--active': this.props.active
        })}
        onClick={ev => {
          if (selectedTorrent && !isEmpty(selectedTorrent) && selectedTorrent.infohash === infohash) {
            unsetTorrent()
          } else {
            setTorrent(torrent.infohash, ev)
          }
        }}>
        <td className='torrent-list__data torrent-list__data--title'>
          <StatusIcon
            className='torrent-list__status'
            status={status} />
          <div className='torrent-list__meta'>
            <span className='torrent-list__meta__title'>{name}</span>
            {!!torrent.trackers && !!torrent.trackers.length &&
              <ul className='torrent-list__meta__list'>
                <li className='torrent-list__meta__item'>{infohash.substring(0, 6).toLowerCase()}</li>
                <li className='torrent-list__meta__item'>{parse(torrent.trackers[0].url).hostname}</li>
              </ul>
            }
          </div>
        </td>
        <td className='torrent-list__data torrent-list__data--completion'>
          <ProgressBar
            status={status}
            progress={(+bytes_downloaded / +bytes_total * 100).toFixed(2) + '%'} />
        </td>
        <td className='torrent-list__data'>{bytes(+bytes_total)}</td>
        <td className='torrent-list__data'>{bytes(+download_speed)}/s</td>
        <td className='torrent-list__data'>{bytes(+upload_speed)}/s</td>
        <td className='torrent-list__data'>{num_seeders}</td>
        <td className='torrent-list__data'>{num_peers}</td>
        <td className='torrent-list__data'>{+bytes_remaining ? eta || '-' : <i className='fa fa-fw fa-check' />}</td>
        <td className='torrent-list__data'>{+ratio / 1000}</td>
      </tr>
    )
  }
})

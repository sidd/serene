import React from 'react'
import cx from 'classnames'
import ProgressBar from './ProgressBar'

export default React.createClass({
  propTypes: {
    active: React.PropTypes.bool,
    torrent: React.PropTypes.object
  },
  render () {
    const torrent = this.props.torrent
    return (
      <tr className={cx('torrent-list__item', { 'torrent-list__item--active': this.props.active })}>
        <td className='torrent-list__data torrent-list__data--title'>{torrent.title}</td>
        <td className='torrent-list__data torrent-list__data--completion'>
          <ProgressBar progress={torrent.progress} />
        </td>
        <td className='torrent-list__data'>{torrent.seeds.connected} ({torrent.seeds.total})</td>
        <td className='torrent-list__data'>{torrent.peers.connected} ({torrent.peers.total})</td>
      </tr>
    )
  }
})

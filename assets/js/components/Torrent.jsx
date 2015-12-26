import React, { PropTypes } from 'react'
import cx from 'classnames'
import ProgressBar from './ProgressBar'

export default React.createClass({
  propTypes: {
    active: PropTypes.bool,
    torrent: PropTypes.object
  },
  render () {
    const torrent = this.props.torrent
    return (
      <tr className={cx('torrent-list__item', { 'torrent-list__item--active': this.props.active })}>
        <td className='torrent-list__data torrent-list__data--title'>{torrent['d.get_name=']}</td>
        <td className='torrent-list__data torrent-list__data--completion'>
          <ProgressBar progress={(+torrent['d.get_bytes_done='] / torrent['d.get_size_bytes=']).toFixed(2) + '%'} />
        </td>
        <td className='torrent-list__data'>{torrent['d.get_peers_accounted=']}</td>
        <td className='torrent-list__data'>{torrent['d.get_peers_complete=']}</td>
      </tr>
    )
  }
})

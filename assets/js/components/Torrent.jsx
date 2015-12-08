import React from 'react'
import cx from 'classnames'
import ProgressBar from './ProgressBar'

export default React.createClass({
  propTypes: {
    active: React.PropTypes.bool
  },
  render () {
    return (
      <tr className={cx('torrent-list__item', { 'torrent-list__item--active': this.props.active })}>
        <td className='torrent-list__data torrent-list__data--title'>This.Is.A.Movie.2009-LOL</td>
        <td className='torrent-list__data torrent-list__data--completion'>
          <ProgressBar progress={Math.random() * 100 + '%'} />
        </td>
        <td className='torrent-list__data'>1 (5)</td>
        <td className='torrent-list__data'>20 (461)</td>
      </tr>
    )
  }
})

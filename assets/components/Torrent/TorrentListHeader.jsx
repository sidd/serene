import React, { PropTypes } from 'react'
import TorrentListHeaderItem from './TorrentListHeaderItem'

export default React.createClass({
  propTypes: {
    handleClick: PropTypes.func,
    sortedBy: PropTypes.string,
    isSortedByDescending: PropTypes.bool
  },

  render () {
    const { isSortedByDescending, handleClick, sortedBy } = this.props

    return (
      <thead>
        <tr className='torrent-list__head'>
          <TorrentListHeaderItem
            className='torrent-list__head__item--title'
            handleClick={handleClick}
            sortedBy={sortedBy}
            isSortedByDescending={isSortedByDescending}
            name='name'>
            Title
          </TorrentListHeaderItem>
          <TorrentListHeaderItem
            sortedBy={sortedBy}
            isSortedByDescending={isSortedByDescending}
            handleClick={handleClick}>
            Progress
          </TorrentListHeaderItem>
          <TorrentListHeaderItem
            sortedBy={sortedBy}
            handleClick={handleClick}
            isSortedByDescending={isSortedByDescending}
            name='bytes_total'>
            Size
          </TorrentListHeaderItem>
          <TorrentListHeaderItem
            sortedBy={sortedBy}
            handleClick={handleClick}
            isSortedByDescending={isSortedByDescending}
            name='download_speed'>
            DL
          </TorrentListHeaderItem>
          <TorrentListHeaderItem
            sortedBy={sortedBy}
            handleClick={handleClick}
            isSortedByDescending={isSortedByDescending}
            name='upload_speed'>
            UL
          </TorrentListHeaderItem>
          <TorrentListHeaderItem
            sortedBy={sortedBy}
            handleClick={handleClick}
            isSortedByDescending={isSortedByDescending}
            name='seeders'>
            Seeds
          </TorrentListHeaderItem>
          <TorrentListHeaderItem
            sortedBy={sortedBy}
            handleClick={handleClick}
            isSortedByDescending={isSortedByDescending}
            name='peers'>
            Peers
          </TorrentListHeaderItem>
          <TorrentListHeaderItem
            sortedBy={sortedBy}
            isSortedByDescending={isSortedByDescending}
            handleClick={handleClick}>
            ETA
          </TorrentListHeaderItem>
          <TorrentListHeaderItem
            sortedBy={sortedBy}
            handleClick={handleClick}
            isSortedByDescending={isSortedByDescending}
            name='ratio'>
            Ratio
          </TorrentListHeaderItem>
        </tr>
      </thead>
    )
  }
})

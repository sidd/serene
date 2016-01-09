import React, { PropTypes } from 'react'
import TorrentListHeaderItem from './TorrentListHeaderItem'

export default React.createClass({
  propTypes: {
    handleClick: PropTypes.func
  },

  render () {
    const { handleClick } = this.props

    return (
      <thead>
        <tr className='torrent-list__head'>
          <TorrentListHeaderItem
            handleClick={handleClick} className='torrent-list__head__title'
            name='name'>
            Title
          </TorrentListHeaderItem>
          <TorrentListHeaderItem
            handleClick={handleClick}>
            Progress
          </TorrentListHeaderItem>
          <TorrentListHeaderItem
            handleClick={handleClick}
            name='bytes_total'>
            Size
          </TorrentListHeaderItem>
          <TorrentListHeaderItem
            handleClick={handleClick}>
            DL
          </TorrentListHeaderItem>
          <TorrentListHeaderItem
            handleClick={handleClick}>
            UL
          </TorrentListHeaderItem>
          <TorrentListHeaderItem
            handleClick={handleClick}>
            Seeds
          </TorrentListHeaderItem>
          <TorrentListHeaderItem
            handleClick={handleClick}>
            Peers
          </TorrentListHeaderItem>
          <TorrentListHeaderItem
            handleClick={handleClick}>
            ETA
          </TorrentListHeaderItem>
          <TorrentListHeaderItem
            handleClick={handleClick}>
            Ratio
          </TorrentListHeaderItem>
        </tr>
      </thead>
    )
  }
})

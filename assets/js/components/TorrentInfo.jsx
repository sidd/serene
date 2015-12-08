import React from 'react'

export default React.createClass({
  render () {
    return (
      <section className='torrent-info__container app__component app__component--info'>
        <dl className='torrent-info'>
          <dt className='torrent-info__data'>Hash</dt>
          <dd className='torrent-info__key'>cd50bd045f5be0dad28c2c21962af670bd523c12</dd>
          <dt className='torrent-info__data'>Save As:</dt>
          <dd className='torrent-info__key'>/var/downloads/torrents/Trentemøller-2006-The Last Resort -320</dd>
          <dt className='torrent-info__data'>Free Disk Space:</dt>
          <dd className='torrent-info__key'>89.99 GB</dd>
          <dt className='torrent-info__data'>Created On:</dt>
          <dd className='torrent-info__key'>25.09.2009 10:43:29</dd>
        </dl>
      </section>
    )
  }
})

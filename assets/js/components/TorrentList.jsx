import React from 'react'
import Torrent from './Torrent'

export default React.createClass({
  render () {
    return (
      <section className='torrent-list__container app__component app__component--list'>
        <table className='torrent-list'>
          <thead>
            <tr className='torrent-list__head'>
              <th>Title</th>
              <th>Progress</th>
              <th>Seeders</th>
              <th>Peers</th>
            </tr>
          </thead>
          <tbody>
            <Torrent active={true} />
            <Torrent />
            <Torrent />
            <Torrent />
          </tbody>
        </table>
      </section>
    )
  }
})

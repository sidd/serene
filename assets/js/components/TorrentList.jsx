import React from 'react'
import Torrent from './Torrent'

export default React.createClass({
  render () {
    return (
      <section className='torrent-list__container app__component app__component--list'>
        <table className='torrent-list'>
          <thead>
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

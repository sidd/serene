import React from 'react'
import Torrent from './Torrent'

export default React.createClass({
  propTypes: {
    torrents: React.PropTypes.object.isRequired
  },
  render () {
    const torrents = this.props.torrents.items
    const torrentItems = Object.keys(torrents).map(i => torrents[i])
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
            {torrentItems.map(
              (t, i) => <Torrent torrent={t} key={t.id} active={i === 0} />
            )}
          </tbody>
        </table>
      </section>
    )
  }
})

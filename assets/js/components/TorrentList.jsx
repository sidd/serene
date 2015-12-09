import React from 'react'
import Torrent from './Torrent'

export default React.createClass({
  propTypes: {
    torrents: React.PropTypes.array.isRequired
  },
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
            {this.props.torrents.items.map(t => <Torrent torrent={t} key={t.id} active={true} />)}
          </tbody>
        </table>
      </section>
    )
  }
})

import React, { PropTypes } from 'react'
import Torrent from './Torrent'

export default React.createClass({
  propTypes: {
    torrents: PropTypes.array.isRequired,
    unsetTorrent: PropTypes.func.isRequired,
    setTorrent: PropTypes.func.isRequired,
    selectedTorrent: PropTypes.object
  },
  render () {
    const { unsetTorrent, setTorrent, torrents, selectedTorrent } = this.props

    return (
      <section className='torrent-list__container app__component app__component--list' onClick={unsetTorrent}>
        <table className='torrent-list'>
          <thead>
            <tr className='torrent-list__head'>
              <th>Title</th>
              <th>Progress</th>
              <th>Size</th>
              <th>DL</th>
              <th>UL</th>
              <th>Seeds</th>
              <th>Peers</th>
              <th>ETA</th>
              <th>Ratio</th>
            </tr>
          </thead>
          <tbody>
            {torrents.map(
              (t, i) =>
                <Torrent
                  torrent={t}
                  key={t.infohash}
                  active={selectedTorrent && selectedTorrent.infohash === t.infohash}
                  setTorrent={setTorrent} />
            )}
          </tbody>
        </table>
      </section>
    )
  }
})

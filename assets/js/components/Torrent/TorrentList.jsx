import React, { PropTypes } from 'react'
import Torrent from './Torrent'

require('./styles/TorrentList')

export default React.createClass({
  propTypes: {
    torrents: PropTypes.array.isRequired,
    unsetTorrent: PropTypes.func.isRequired,
    setTorrent: PropTypes.func.isRequired,
    selectedTorrent: PropTypes.object
  },

  /**
   * Enables traversal through torrent listing via j/k keys.
   *
   * @param  {Object} ev `keydown` event.
   */
  _onKeyDown (ev) {
    const { setTorrent, torrents, selectedTorrent } = this.props

    // get index of `selectedTorrent` in `torrents`
    var index
    torrents.find((el, i, arr) => {
      if (el.infohash === selectedTorrent.infohash) {
        index = i
        return true
      }
    })
    switch (ev.keyCode) {
      case 74:
        if (index < torrents.length - 1) {
          setTorrent(torrents[index + 1])
        }
        break
      case 75:
        if (index !== 0) {
          setTorrent(torrents[index - 1])
        }
        break
    }
  },

  /**
   * Begins listening for keydown events.
   */
  componentDidMount () {
    document.addEventListener('keydown', this._onKeyDown)
  },

  /**
   * Terminates listening for keydown events.
   */
  componentWillUnmount () {
    document.removeEventListener('keydown', this._onKeyDown)
  },

  render () {
    const { unsetTorrent, setTorrent, torrents, selectedTorrent } = this.props

    return (
      <section className='torrent-list__container app__component app__component--list' onClick={unsetTorrent}>
        <table className='torrent-list'>
          <thead>
            <tr className='torrent-list__head'>
              <th className='torrent-list__head__title'>Title</th>
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
                  selectedTorrent={selectedTorrent}
                  unsetTorrent={unsetTorrent}
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

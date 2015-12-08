import React from 'react'

export default React.createClass({
  render () {
    return (
      <div className='header'>
        <ul className='tabs'>
          <li className='tabs__tab tabs__tab--active'>
            <div className='tabs__tab__text'>
              <span className='tabs__tab__title'>rTorrent</span> <span className='tabs__tab__meta'>(58 / 64)</span>
            </div>
          </li>
          <li className='tabs__tab'>
            <div className='tabs__tab__text'>
              <span className='tabs__tab__title'>Deluge</span> <span className='tabs__tab__meta'>(30 / 2)</span>
            </div>
          </li>
        </ul>
      </div>

    )
  }
})

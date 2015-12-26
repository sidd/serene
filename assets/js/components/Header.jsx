import React from 'react'
import HeaderTab from './HeaderTab'

export default React.createClass({
  propTypes: {
    controller: React.PropTypes.object
  },
  render () {
    return (
      <header className='header'>
        <ul className='tabs'>
          <HeaderTab title='rTorrent' active={true} />
          <HeaderTab title='Deluge' />
        </ul>
      </header>

    )
  }
})

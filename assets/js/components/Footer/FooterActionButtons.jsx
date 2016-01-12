import React, { PropTypes } from 'react'

require('./styles/Footer')

export default React.createClass({
  propTypes: {
    handleRemoveClick: PropTypes.func.isRequired,
    handleStatusClick: PropTypes.func.isRequired,
    selectedTorrent: PropTypes.object.isRequired
  },

  render () {
    const { handleRemoveClick, handleStatusClick, selectedTorrent } = this.props
    const { infohash } = selectedTorrent
    return (
      <ul className='footer__actions-list'>
        <li className='footer__actions-item' onClick={handleStatusClick.bind(null, { infohash, status: 'start' })}>
          <i className='fa fa-play'></i>
          <span>P</span>
        </li>
        <li className='footer__actions-item' onClick={handleStatusClick.bind(null, { infohash, status: 'pause' })}>
          <i className='fa fa-pause'></i>
          <span>A</span>
        </li>
        <li className='footer__actions-item' onClick={handleStatusClick.bind(null, { infohash, status: 'stop' })}>
          <i className='fa fa-stop'></i>
          <span>S</span>
        </li>
        <li className='footer__actions-item' onClick={handleStatusClick.bind(null, { infohash, status: 'check' })}>
          <i className='fa fa-refresh'></i>
          <span>R</span>
        </li>
        <li className='footer__actions-item' onClick={handleRemoveClick.bind(null, infohash)}>
          <i className='fa fa-remove'></i>
          <span>X</span>
        </li>
      </ul>
    )
  }
})

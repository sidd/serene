import React, { PropTypes } from 'react'

export default React.createClass({
  propTypes: {
    children: PropTypes.node
  },

  render () {
    return (
      <div className='torrent-info__data'>
        {this.props.children}
      </div>
    )
  }
})

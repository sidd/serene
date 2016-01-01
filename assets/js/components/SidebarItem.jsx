import React, { PropTypes } from 'react'

export default React.createClass({
  propTypes: {
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    handleClick: PropTypes.func
  },

  render () {
    return (
    <li className='sidebar__item'>
      <a
        className='sidebar__link'
        onClick={this.props.handleClick}>
        {this.props.text}
      </a>
    </li>
    )
  }
})

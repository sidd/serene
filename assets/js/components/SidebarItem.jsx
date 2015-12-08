import React from 'react'

export default React.createClass({
  propTypes: {
    text: React.PropTypes.string
  },
  render () {
    return (
    <li className='sidebar__item'>
      <a href='#'>
        {this.props.text}
      </a>
    </li>
    )
  }
})

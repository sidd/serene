import React, { PropTypes } from 'react'

require('./styles/SidebarItem')

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
      {/* <a
        className='sidebar__link'
        onClick={this.props.handleClick}>
        <i className={'fa fa-fw sidebar__icon ' + this.props.icon} />
        {this.props.children}
      </a> */}
    </li>
    )
  }
})

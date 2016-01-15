import React, { PropTypes } from 'react'
import cx from 'classnames'

export default React.createClass({
  propTypes: {
    handleClick: PropTypes.func,
    icon: PropTypes.string,
    children: PropTypes.node
  },

  render () {
    const { handleClick, icon, children } = this.props

    return (
      <li className='header__dropdown-item' onClick={handleClick}>
        <i className={cx('fa fa-fw header__dropdown__icon', {
          [icon]: icon
        })} />
        {children}
      </li>
    )
  }
})

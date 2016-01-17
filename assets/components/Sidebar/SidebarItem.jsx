import React, { PropTypes } from 'react'
import cx from 'classnames'

require('./styles/SidebarItem')

export default React.createClass({
  propTypes: {
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    handleClick: PropTypes.func,
    active: PropTypes.bool,
    icon: PropTypes.string,
    children: PropTypes.node
  },

  render () {
    const { active, handleClick, icon, children } = this.props

    return (
    <li
      className={cx('sidebar__item', {
        'sidebar__item--active': active
      })}
      onClick={handleClick}>
      <a className='sidebar__link'>
        <i className={cx('fa fa-fw sidebar__icon', icon, {
          'sidebar__icon--active': active
        })} />
        {children}
      </a>
    </li>
    )
  }
})

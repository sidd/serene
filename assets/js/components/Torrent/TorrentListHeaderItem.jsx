import React, { PropTypes } from 'react'
import cx from 'classnames'

export default React.createClass({
  propTypes: {
    children: PropTypes.node,
    className: PropTypes.string,
    handleClick: PropTypes.func,
    name: PropTypes.string,
    isSortedByDescending: PropTypes.bool,
    sortedBy: PropTypes.string
  },

  render () {
    const { children, className, handleClick, name, sortedBy, isSortedByDescending } = this.props

    return (
      <th
        className={cx(className, ' torrent-list__head__item', {
          'torrent-list__head__item--sorted': true
        })}
        name={name}
        onClick={handleClick}>
        {children}
        {sortedBy === name &&
          <i className={cx('fa fa-sm', {
            'fa-caret-down': isSortedByDescending,
            'fa-caret-up': !isSortedByDescending
          })} />
        }
      </th>
    )
  }
})

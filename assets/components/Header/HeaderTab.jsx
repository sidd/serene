import cx from 'classnames'
import React, { PropTypes } from 'react'

export default React.createClass({
  propTypes: {
    active: PropTypes.bool,
    connection: PropTypes.object.isRequired,
    connectionKey: PropTypes.string,
    handleClick: PropTypes.func,
    showExtra: PropTypes.bool
  },

  getDefaultProps () {
    return {
      showExtra: false
    }
  },

  render () {
    const { active, connection, connectionKey, handleClick, showExtra } = this.props
    return (
      <li
        className={cx('header__tabs__tab', { 'header__tabs__tab--active': active })}
        onClick={handleClick}>
        <span className='header__tabs__tab__title'>
          {connection.prettyName}
          <span className='header__tabs__tab__meta'>{!!showExtra && `(${connectionKey})`}</span>
        </span>
      </li>
    )
  }
})

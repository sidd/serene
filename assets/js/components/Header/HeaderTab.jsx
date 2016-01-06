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
        className={cx('tabs__tab', { 'tabs__tab--active': active })}
        onClick={handleClick}>
        <div className='tabs__tab__text'>
          <span className='tabs__tab__title'>{connection.prettyName}</span> <span className='tabs__tab__meta'>{!!showExtra && `(${connectionKey})`}</span>
        </div>
      </li>
    )
  }
})

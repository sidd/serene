import React from 'react'
import cx from 'classnames'

export default React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    active: React.PropTypes.bool
  },
  render () {
    return (
      <li className={cx('tabs__tab', { 'tabs__tab--active': this.props.active })}>
        <div className='tabs__tab__text'>
          <span className='tabs__tab__title'>{this.props.title}</span> <span className='tabs__tab__meta'>(58 / 64)</span>
        </div>
      </li>
    )
  }
})

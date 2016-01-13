import React, { PropTypes } from 'react'
import cx from 'classnames'

require('./styles/StatusIcon')

export default React.createClass({
  propTypes: {
    status: PropTypes.string,
    className: PropTypes.string
  },

  render () {
    const { status } = this.props

    var statusClass = 'fa-refresh'

    switch (status) {
      case 'downloading':
        statusClass = 'fa-arrow-down'
        break
      case 'uploading':
        statusClass = 'fa-arrow-up'
        break
      case 'paused':
        statusClass = 'fa-pause fa-sm'
        break
      case 'stopped':
        statusClass = 'fa-stop fa-sm'
        break
      case 'checking':
        statusClass = 'fa-refresh fa-sm'
        break
    }

    return (
      <span className={cx('fa-stack icon', this.props.className, {
        ['icon--' + status]: status,
        'icon--status': status
      })}>
        <i className='fa fa-circle fa-stack-2x'></i>
        <i className={'icon__icon fa fa-inverse fa-stack-1x ' + statusClass}></i>
      </span>
    )
  }
})

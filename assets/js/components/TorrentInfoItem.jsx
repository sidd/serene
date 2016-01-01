import React, { PropTypes } from 'react'
import cx from 'classnames'

export default React.createClass({
  propTypes: {
    label: PropTypes.string,
    value: PropTypes.string,
    valueModifier: PropTypes.string, // TODO: or array of strings
    className: PropTypes.string
  },

  render () {
    const { className, valueModifier, label, value } = this.props

    return (
      <div className={cx(className || 'torrent-info__data')}>
        <dt className='torrent-info__key'>{label}</dt>
        <dd className={cx('torrent-info__value', { ['torrent-info__value--' + valueModifier]: valueModifier })}>{value || '-'}</dd>
      </div>
    )
  }
})

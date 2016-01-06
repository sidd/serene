import React, { PropTypes } from 'react'
import bytes from 'bytes'

require('./styles/Footer')

export default React.createClass({
  propTypes: {
    stats: PropTypes.object.isRequired,
    controller: PropTypes.object.isRequired
  },

  render () {
    const { stats, controller } = this.props
    const { download_rate, upload_rate, download_rate_max, upload_rate_max } = stats

    var throttled = false
    if (!!+download_rate_max || !!+upload_rate_max) {
      throttled = true
    }

    return (
      <ul className='footer__info-list'>
        <li className='footer__info-item'>
          {throttled && <span>Throttled: </span>}

          <i className='fa fa-fw fa-arrow-down'></i>
          <span>{bytes(+download_rate)}/s</span>
          {!!+download_rate_max && <span> ({bytes(+download_rate_max)}/s)</span>}
          {/* lol. */}
          <span>&nbsp;&nbsp;</span>
          <i className='fa fa-fw fa-arrow-up'></i>
          <span>{bytes(+upload_rate)}/s</span>
          {!!+upload_rate_max && <span> ({bytes(+upload_rate_max)}/s)</span>}
        </li>
        <li className='footer__info-item'>
          <span><i className='fa fa-fw fa-database'></i> {controller.prettyName}</span>
        </li>
      </ul>
    )
  }
})

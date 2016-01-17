import React, { PropTypes } from 'react'
import bytes from 'bytes'
import { version } from '../../../package.json'

require('./styles/Footer')

export default React.createClass({
  propTypes: {
    stats: PropTypes.object,
    controller: PropTypes.object.isRequired
  },

  render () {
    const { stats, controller } = this.props

    var throttled = false
    if (stats) {
      if (!!+stats.download_rate_max || !!+stats.upload_rate_max) {
        throttled = true
      }
    }

    return (
      <ul className='footer__info-list'>
        {stats &&
          <li className='footer__info-item'>
            {throttled && <span>Throttled: </span>}

            <i className='fa fa-fw fa-arrow-down'></i>
            <span>{bytes(+stats.download_rate)}/s</span>
            {!!+stats.download_rate_max && <span> ({bytes(+stats.download_rate_max)}/s)</span>}
            {/* lol. */}
            <span>&nbsp;&nbsp;</span>
            <i className='fa fa-fw fa-arrow-up'></i>
            <span>{bytes(+stats.upload_rate)}/s</span>
            {!!+stats.upload_rate_max && <span> ({bytes(+stats.upload_rate_max)}/s)</span>}
          </li>
        }
        <li className='footer__info-item'>
          <span><i className='fa fa-fw fa-database'></i> {controller.config.name}</span>
        </li>
        <li className='footer__info-item'>
          <span>
            v{version}
          </span>
        </li>
      </ul>
    )
  }
})

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { footerSelector } from '../selectors'
import bytes from 'bytes'

const FooterContainer = React.createClass({
  propTypes: {
    controller: PropTypes.object.isRequired,
    stats: PropTypes.object
  },

  render () {
    const { download_rate, upload_rate, download_rate_max, upload_rate_max } = this.props.stats

    var throttled = false
    if (!!+download_rate_max || !!+upload_rate_max) {
      throttled = true
    }

    return (
      <section className='footer'>
        <ul className='footer__info-list'>
          <li className='footer__info-item'>
            {throttled && <span>Throttled: </span>}

            <i className='fa fa-fw fa-arrow-up'></i>
            <span>{bytes(+upload_rate)}/s</span>
            {!!+upload_rate_max && <span> ({bytes(+upload_rate_max)}/s)</span>}

            {/* lol. */}
            <span>&nbsp;&nbsp;</span>
            <i className='fa fa-fw fa-arrow-down'></i>
            <span>{bytes(+download_rate)}/s</span>
            {!!+download_rate_max && <span> ({bytes(+download_rate_max)}/s)</span>}

          </li>
          <li className='footer__info-item'>
            <i className='fa fa-fw fa-database'></i> 598.2TB
          </li>
        </ul>
      </section>
    )
  }
})

export default connect(footerSelector)(FooterContainer)

import cx from 'classnames'
import React, { PropTypes } from 'react'

require('./styles/ProgressBar')

export default React.createClass({
  propTypes: {
    progress: PropTypes.string,
    status: PropTypes.string
  },

  render () {
    const { status } = this.props

    return (
      <div className='progress'>
        <div className='progress__bar'>
          <div className={cx('progress__bar__progress', status && ('progress__bar__progress--' + status))} style={{ width: this.props.progress }} />
        </div>
        {/* <div className='progress__text__container'>
          <span className='progress__text'>{this.props.progress}</span>
        </div> */}
      </div>
    )
  }
})

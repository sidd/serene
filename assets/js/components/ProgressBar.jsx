import React from 'react'

export default React.createClass({
  propTypes: {
    progress: React.PropTypes.string
  },
  render () {
    return (
      <div className='progress'>
        <div className='progress__bar'>
          <div className='progress__bar__progress' style={{ width: this.props.progress }} />
        </div>
        <div className='progress__text__container'>
          <span className='progress__text'>{this.props.progress}</span>
        </div>
      </div>
    )
  }
})

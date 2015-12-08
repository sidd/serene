import React from 'react'

export default React.createClass({
  propTypes: {
    progress: React.PropTypes.string
  },
  render () {
    return (
      <div className='progress-bar__container'>
        <div className='progress-bar'>
          <div className='progress-bar__progress' style={{ width: this.props.progress }}/>
        </div>
      </div>
    )
  }
})

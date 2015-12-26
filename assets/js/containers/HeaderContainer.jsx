import React from 'react'
import Header from '../components/Header'

export default React.createClass({
  propTypes: {
    controller: React.PropTypes.object
  },
  render () {
    return (
      <Header />
    )
  }
})

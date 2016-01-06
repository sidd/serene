import Header from 'components/Header/Header'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { headerSelector } from 'selectors'
import { selectConnection } from 'actions/ConnectionActions'

const HeaderContainer = React.createClass({
  propTypes: {
    controller: PropTypes.object,
    connections: PropTypes.object,
    connectionsSelected: PropTypes.string,
    dispatch: PropTypes.func
  },

  handleConnectionClick (conn) {
    this.props.dispatch(selectConnection(conn))
  },

  render () {
    const { connectionsSelected, connections } = this.props

    return (
      !!connectionsSelected &&
        <Header
          connections={connections}
          connectionsSelected={connectionsSelected}
          handleConnectionClick={this.handleConnectionClick} />
    )
  }
})

export default connect(headerSelector)(HeaderContainer)

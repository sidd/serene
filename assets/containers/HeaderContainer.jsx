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
    dispatch: PropTypes.func,
    handleAddConnectionClick: PropTypes.func,
    handleAddTorrentClick: PropTypes.func,
    handleDropdownToggle: PropTypes.func,
    isDropdownOpen: PropTypes.bool
  },

  handleConnectionClick (conn) {
    this.props.dispatch(selectConnection(conn))
  },

  render () {
    const { handleAddTorrentClick, handleAddConnectionClick, handleDropdownToggle, isDropdownOpen, connectionsSelected, connections } = this.props

    return (
      !!connectionsSelected &&
        <Header
          connections={connections}
          connectionsSelected={connectionsSelected}
          handleAddTorrentClick={handleAddTorrentClick}
          handleAddConnectionClick={handleAddConnectionClick}
          handleConnectionClick={this.handleConnectionClick}
          handleDropdownToggle={handleDropdownToggle}
          isDropdownOpen={isDropdownOpen} />
    )
  }
})

export default connect(headerSelector)(HeaderContainer)

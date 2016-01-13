import HeaderTab from './HeaderTab'
import React, { PropTypes } from 'react'

require('./styles/Header')

export default React.createClass({
  propTypes: {
    controller: PropTypes.object,
    connections: PropTypes.object,
    connectionsSelected: PropTypes.string,
    handleConnectionClick: PropTypes.func
  },

  render () {
    const { handleConnectionClick, connections, connectionsSelected } = this.props
    return (
      <header className='header'>
        <ul className='header__tabs'>
          {Object.keys(connections).map(conn =>
            <HeaderTab
              active={connectionsSelected === conn}
              key={conn}
              handleClick={handleConnectionClick.bind(null, conn)}
              connectionKey={conn}
              connection={connections[conn]}
              showExtra />
          )}
        </ul>
      </header>
    )
  }
})

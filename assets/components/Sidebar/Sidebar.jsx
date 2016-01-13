import React, { PropTypes } from 'react'
import SidebarItem from './SidebarItem'

require('./styles/Sidebar')

export default React.createClass({
  propTypes: {
    handleAddClick: PropTypes.func.isRequired,
    handleAddConnectionClick: PropTypes.func.isRequired
  },

  render () {
    return (
      <section className='sidebar app__component app__component--sidebar'>
        <p>Navigation</p>
        <ul className='sidebar__list'>
          <SidebarItem
            icon='fa-table'
            handleClick={this.props.handleAddClick}>
            Dashboard
          </SidebarItem>
          <SidebarItem
            icon='fa-gear'
            handleClick={this.props.handleAddClick}>
            Settings
          </SidebarItem>
        </ul>
      </section>
    )
  }
})

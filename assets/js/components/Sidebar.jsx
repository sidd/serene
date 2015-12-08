import React from 'react'
import SidebarItem from './SidebarItem'

export default React.createClass({
  render () {
    return (
      <section className='sidebar app__component app__component--sidebar'>
        <ul className='sidebar__list'>
          <SidebarItem text='T' />
          <SidebarItem text='S' />
          <SidebarItem text='P' />
        </ul>
      </section>
    )
  }
})

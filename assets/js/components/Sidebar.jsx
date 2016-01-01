import React, { PropTypes } from 'react'
import SidebarItem from './SidebarItem'

export default React.createClass({
  propTypes: {
    handleAddClick: PropTypes.func
  },

  render () {
    return (
      <section className='sidebar app__component app__component--sidebar'>
        <ul className='sidebar__list'>
          <SidebarItem
            text={<i className='fa fa-fw fa-plus' />}
            handleClick={this.props.handleAddClick} />
          <SidebarItem text={<i className='fa fa-fw fa-gear' />} />

        </ul>
      </section>
    )
  }
})

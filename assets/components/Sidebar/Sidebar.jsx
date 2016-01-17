import React, { PropTypes } from 'react'
import cx from 'classnames'
import SidebarItem from './SidebarItem'

require('./styles/Sidebar')

export default React.createClass({
  propTypes: {
    handleClick: PropTypes.func.isRequired,
    isDropdownOpen: PropTypes.bool,
    isFiltered: PropTypes.bool,
    filteredBy: PropTypes.string
  },

  render () {
    const { filteredBy, handleClick, isDropdownOpen } = this.props

    return (
      <section className={cx('sidebar app__component app__component--sidebar', {
        'sidebar--dropdown-open': isDropdownOpen
      })}>
        <h2 className='sidebar__item sidebar__heading'>Views</h2>
        <ul className='sidebar__list'>
          <SidebarItem
            icon='fa-bullseye'
            active={!filteredBy}
            handleClick={() => handleClick(null, 'status')}>
            <span>All Transfers</span>
          </SidebarItem>
          <SidebarItem
            icon='fa-arrow-down'
            active={filteredBy === 'downloading'}
            handleClick={() => handleClick('downloading', 'status')}>
            <span>Downloading</span>
          </SidebarItem>
          <SidebarItem
            icon='fa-arrow-up'
            active={filteredBy === 'uploading'}
            handleClick={() => handleClick('uploading', 'status')}>
            <span>Uploading</span>
          </SidebarItem>
          <SidebarItem
            icon='fa-exchange'>
            <span>Active</span>
          </SidebarItem>
          <SidebarItem
            icon='fa-hand-paper-o'>
            <span>Inactive</span>
          </SidebarItem>
        </ul>
        <h2 className='sidebar__item sidebar__heading'>Filters</h2>
        <ul className='sidebar__list'>
          <SidebarItem
            icon='fa-filter'>
            <span>Linux ISOs</span>
          </SidebarItem>
          <SidebarItem
            icon='fa-filter'>
            <span>CC Videos</span>
          </SidebarItem>
        </ul>
      </section>
    )
  }
})

import React, { PropTypes } from 'react'
import HeaderDropdownItem from './HeaderDropdownItem'

export default React.createClass({
  propTypes: {
    handleDropdownToggle: PropTypes.func,
    handleAddTorrentClick: PropTypes.func,
    handleAddConnectionClick: PropTypes.func
  },

  _onKeyDown (ev) {
    if (ev.keyCode === 27) {
      ev.stopPropagation()
      this.props.handleDropdownToggle()
    }
  },

  _closeClickListener (ev) {
    // yuck
    const header = document.querySelector('.header__title')

    if (!this.refs.root.contains(ev.target) && !header.contains(ev.target)) {
      this.props.handleDropdownToggle()
    }
  },

  componentDidMount () {
    document.addEventListener('keydown', this._onKeyDown)
    document.addEventListener('mousedown', this._closeClickListener)
  },

  componentWillUnmount () {
    document.removeEventListener('keydown', this._onKeyDown)
    document.removeEventListener('mousedown', this._closeClickListener)
  },

  render () {
    const { handleAddConnectionClick, handleAddTorrentClick } = this.props

    return (
      <ul className='header__dropdown-list' ref='root'>
        <HeaderDropdownItem
          icon='fa-plus'
          handleClick={handleAddConnectionClick}>
          Add Connection...
        </HeaderDropdownItem>

        <HeaderDropdownItem
          icon='fa-archive'
          handleClick={handleAddTorrentClick}>
          Add Torrent...
        </HeaderDropdownItem>

        <li className='header__dropdown-separator' />

        <HeaderDropdownItem
          icon='fa-gear'>
          Settings
        </HeaderDropdownItem>

        <HeaderDropdownItem
          icon='fa-bug'>
          Report a Bug
        </HeaderDropdownItem>
        <HeaderDropdownItem
          icon='fa-power-off'>
          Exit Serene
        </HeaderDropdownItem>
      </ul>
    )
  }
})

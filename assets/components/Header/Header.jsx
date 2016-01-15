import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import cx from 'classnames'
import HeaderDropdown from './HeaderDropdown'
import { parse } from 'url'

require('./styles/Header')

export default React.createClass({
  propTypes: {
    connections: PropTypes.object,
    connectionsSelected: PropTypes.string,
    controller: PropTypes.object,
    handleAddConnectionClick: PropTypes.func,
    handleAddTorrentClick: PropTypes.func,
    handleConnectionClick: PropTypes.func,
    handleDropdownToggle: PropTypes.func,
    isDropdownOpen: PropTypes.bool
  },

  render () {
    const { handleConnectionClick, handleAddTorrentClick, handleAddConnectionClick, isDropdownOpen, handleDropdownToggle, connections, connectionsSelected } = this.props

    return (
      <ReactCSSTransitionGroup
        component='div'
        transitionName='header-transition'
        transitionEnter
        transitionLeave
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}
        className='header__container'>
        {isDropdownOpen &&
          <div className='header__dropdown'>
            <HeaderDropdown
              handleDropdownToggle={handleDropdownToggle}
              handleAddTorrentClick={handleAddTorrentClick}
              handleAddConnectionClick={handleAddConnectionClick} />
          </div>
        }
        <header className='header'>
          <h2 className='header__title' onClick={handleDropdownToggle}>
            <span>{parse(window.location.href).hostname}</span>
            <i className={cx('fa header__caret fa-caret-down', {
              'header__caret--reverse': isDropdownOpen
            })} />
          </h2>
          <ul className='header__connection-list'>
            {connections && Object.keys(connections).map(conn =>
              <li className='header__connection-item' onClick={handleConnectionClick.bind(null, conn)} key={conn}>
                <span className={cx('header__connection', {
                  'header__connection--active': connectionsSelected === conn
                })}>
                  {connections[conn].prettyName}
                </span>
              </li>
            )}
          </ul>
        </header>
      </ReactCSSTransitionGroup>
    )
  }
})

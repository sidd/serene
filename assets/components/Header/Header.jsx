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
    return (
      <header className='header'>
        <div className='header__title'>
          <span>Showing all <span className='header__filter'>active <i className='fa fa-sm fa-caret-down' /></span> transfers from <span className='header__filter'>rTorrent 0.9.6 <i className='fa fa-sm fa-caret-down' /></span></span>
        </div>
        <div className='header__search__container'>
          <label htmlFor='search' className='header__search__label'>
            <i className='fa fa-search' />
          </label>
          <input id='search' type='text' className='input__field input__field--underlined header__search' />
        </div>
        <nav className='nav'>
          <ul className='nav__list'>
            <li className='nav__item'>
              <a href='#' className='nav__link'>
                <i className='fa fa-fw fa-list'></i>
              </a>
            </li>
            <li className='nav__item'>
              <a href='#' className='nav__link'>
                <i className='fa fa-fw fa-gear'></i>
              </a>
            </li>
            <li className='nav__item'>
              <a href='#' className='nav__link'>
                <i className='fa fa-plus fa-fw'></i>
                <i className='fa fa-caret-down nav__link__caret'></i>
              </a>
            </li>
          </ul>
        </nav>
        {/* <ul className='header__tabs'>
          {Object.keys(connections).map(conn =>
            <HeaderTab
              active={connectionsSelected === conn}
              key={conn}
              handleClick={handleConnectionClick.bind(null, conn)}
              connectionKey={conn}
              connection={connections[conn]}
              showExtra />
          )}
        </ul> */}
      </header>
    )
  }
})

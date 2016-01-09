import React, { PropTypes } from 'react'

export default React.createClass({
  propTypes: {
    children: PropTypes.node,
    className: PropTypes.string,
    handleClick: PropTypes.func,
    name: PropTypes.string
  },

  render () {
    const { children, className, handleClick, name } = this.props

    return (
      <th
        className={className}
        name={name}
        onClick={handleClick}>
        {children}
      </th>
    )
  }
})

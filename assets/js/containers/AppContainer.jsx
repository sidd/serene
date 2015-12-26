import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import HeaderContainer from './HeaderContainer'
import BodyContainer from './BodyContainer'
import { setController, getControllers } from '../actions/controller'

const AppContainer = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    controllers: PropTypes.object
  },

  componentWillMount () {
    const { dispatch } = this.props
    dispatch(getControllers())
    dispatch(setController('rtorrent'))
  },

  render () {
    const { items: controllers, active } = this.props.controllers
    const activeController = Object.keys(controllers).length
      ? controllers[active]
      : undefined

    return (
      <div className='app'>
        {activeController && <HeaderContainer controller={activeController} />}
        {activeController && <BodyContainer controller={activeController} />}
      </div>
    )
  }
})

function mapStateToProps (state) {
  const { controllers } = state
  return { controllers }
}

export default connect(mapStateToProps)(AppContainer)

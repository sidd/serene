import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { getStats } from '../actions/StatsActions'
import FooterContainer from './FooterContainer'
import BodyContainer from './BodyContainer'
import { setController, getControllers } from '../actions/ControllerActions'
import { unsetModal } from '../actions/ModalActions'
import { isEmpty } from '../utils'
import ModalContainer from './ModalContainer'
import { appSelector } from '../selectors'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const AppContainer = React.createClass({
  getInitialState () {
    return {
      __init: false
    }
  },

  propTypes: {
    dispatch: PropTypes.func.isRequired,
    controllers: PropTypes.object,
    modal: PropTypes.object,
    selectedController: PropTypes.object
  },

  componentWillMount () {
    const { dispatch } = this.props
    dispatch(getControllers())
    dispatch(setController('rtorrent'))
    this.props.dispatch(getStats(true))
  },

  componentDidMount () {
    setTimeout(() => this.setState({ __init: true }))
  },

  render () {
    const { modal, selectedController } = this.props

    return (
      <ReactCSSTransitionGroup
        component='div'
        className='app'
        transitionName='app-transition'
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}>
        {!isEmpty(modal || {}) && <ModalContainer modal={modal} unsetModal={() => this.props.dispatch(unsetModal())}/>}
        {!isEmpty(selectedController) && <BodyContainer controller={selectedController} />}
        {!isEmpty(selectedController) && <FooterContainer controller={selectedController} />}
      </ReactCSSTransitionGroup>
    )
  }
})
export default connect(appSelector)(AppContainer)

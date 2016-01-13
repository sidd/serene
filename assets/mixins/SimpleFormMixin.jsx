import deepAssign from 'deep-assign'

/**
 * Helper utility to persist form data in state.
 */
const SimpleFormMixin = {

  /**
   * @function componentWillMount
   * @description Initializes state to an empty object.
   */
  componentWillMount () {
    this.setState({
      form: {}
    })
  },

  /**
   * @function simpleFormMixinHandleChange
   * @param {SyntheticEvent} [ev] event from React onChange prop
   * @description To be bound to a `name`d input
   */
  simpleFormMixinHandleChange (ev) {
    const { target } = ev
    this.setState(deepAssign({}, this.state, {
      form: {
        [target.name]: target.value
      }
    }))
  },

  /**
   * @function simpleFormMixinHandleSubmit
   * @param {Function} [actionCreator] Dispatched with state's form data.
   * @param {SyntheticEvent} [ev] event from React onSubmit prop
   */
  simpleFormMixinHandleSubmit (actionCreator, ev) {
    if (ev) ev.preventDefault()
    this.props.dispatch(actionCreator(this.state.form))
  }
}

export default SimpleFormMixin

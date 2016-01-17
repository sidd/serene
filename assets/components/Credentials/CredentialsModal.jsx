import deepAssign from 'deep-assign'
import React, { PropTypes } from 'react'
import SimpleFormMixin from 'mixins/SimpleFormMixin'
import { connect } from 'react-redux'
import { createConnection } from 'actions/ConnectionActions'

require('./styles/Credentials')

const CredentialsModal = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    unsetModal: PropTypes.func.isRequired,
    providers: PropTypes.object.isRequired,
    errors: PropTypes.object
  },

  mixins: [SimpleFormMixin],

  /**
   * Initialize SimpleFormMixin with the first provider.
   * @todo Stop defaulting to rTorrent! :)
   */
  componentDidMount () {
    this.setState(deepAssign({}, this.state, {
      form: {
        provider: Object.keys(this.props.providers)[0]
      }
    }))
  },

  /**
   * Closes modal, and dispatches `setCredentials()` with form data.
   * @param  {[type]} ev [description]
   * @return {[type]}    [description]
   */
  handleSubmit (ev) {
    ev.preventDefault()
    this.simpleFormMixinHandleSubmit(createConnection)
  },

  render () {
    const { providers, errors } = this.props
    const { provider = '' } = this.state.form
    var options = (providers[provider] && providers[provider].config.options) ? providers[provider].config.options : []

    // TODO: move logic to a selector
    var err
    if (errors.connections) {
      err = errors.connections
    }

    return (
      <div className='credentials__container'>
        {!!err &&
          <span className='error credentials__error'>Unable to connect.</span>
        }
        <form className='credentials' onSubmit={this.handleSubmit}>
          <div className='input'>
            <label className='input__label'>Provider</label>
            <select className='input__field input__field--select' name='provider' onChange={this.simpleFormMixinHandleChange}>
              {Object.keys(providers).map(provider =>
                <option key={provider} value={provider}>{providers[provider].config.name}</option>
              )}
            </select>
          </div>
          {options.indexOf('host') > -1 &&
            <div className='input'>
              <input className='input__field input__field--text' type='text' name='host' placeholder='ex. http://127.0.0.1/RPC2' onChange={this.simpleFormMixinHandleChange} />
              <label className='input__label'>Host</label>
            </div>
          }
          {options.indexOf('username') > -1 &&
            <div className='input'>
              <input className='input__field input__field--text' type='text' name='username' onChange={this.simpleFormMixinHandleChange} />
              <label className='input__label'>Username</label>
            </div>
          }
          {options.indexOf('password') > -1 &&
            <div className='input'>
              <input className='input__field input__field--text' type='password' name='password' onChange={this.simpleFormMixinHandleChange} />
              <label className='input__label'>Password</label>
            </div>
          }
          <button type='submit' className='button button--modal-submit credentials__submit'>
            Connect
          </button>
        </form>
      </div>
    )
  }
})

export default connect(state => state)(CredentialsModal)

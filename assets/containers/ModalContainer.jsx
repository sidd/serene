import React, { PropTypes } from 'react'

require('./styles/Modal')

export default React.createClass({
  propTypes: {
    modal: PropTypes.object.isRequired,
    unsetModal: PropTypes.func.isRequired
  },

  /**
   * Dispatches unsetModal action.
   * @param {Object} [ev] `keydown` event.
   */
  _escKeydownListener (ev) {
    if (ev.keyCode === 27) {
      ev.stopPropagation()
      this.props.unsetModal(true)
    }
  },

  /**
   * Begins listening for keydown events.
   */
  componentDidMount () {
    document.addEventListener('keydown', this._escKeydownListener)
  },

  /**
   * Terminates listening for keydown events.
   */
  componentWillUnmount () {
    document.removeEventListener('keydown', this._escKeydownListener)
  },

  render () {
    const { unsetModal, modal } = this.props

    return (
      <div className='modal__container' onClick={() => unsetModal()}>
        <div className='modal' onClick={ev => ev.stopPropagation()}>
          <div className='modal__title'>{modal.title}</div>
          <div className='modal__body'>
            <modal.body unsetModal={this.props.unsetModal} />
          </div>
          {!!modal.footer && <div className='modal__footer'></div>}
        </div>
      </div>
    )
  }
})

import React, { PropTypes } from 'react'

export default React.createClass({
  propTypes: {
    modal: PropTypes.object.isRequired,
    unsetModal: PropTypes.func.isRequired
  },

  _escKeydownListener (e) {
    if (e.keyCode === 27) {
      this.props.unsetModal()
    }
  },

  componentDidMount () {
    document.addEventListener('keydown', this._escKeydownListener)
  },

  componentWillUnmount () {
    document.removeEventListener('keydown', this._escKeydownListener)
  },

  render () {
    const { unsetModal, modal } = this.props

    return (
      <div className='modal__container' onClick={unsetModal}>
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

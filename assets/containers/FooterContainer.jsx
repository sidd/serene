import FooterActionButtons from 'components/Footer/FooterActionButtons'
import FooterInfo from 'components/Footer/FooterInfo'
import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { footerSelector } from 'selectors'
import { getStats } from 'actions/StatsActions'
import { isEmpty } from 'utils'

const FooterContainer = React.createClass({
  propTypes: {
    controller: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
    stats: PropTypes.object,
    selectedTorrent: PropTypes.object,
    handleRemoveClick: PropTypes.func,
    handleStatusClick: PropTypes.func
  },

  componentWillMount () {
    this.props.dispatch(getStats(true))
  },

  render () {
    const { controller, stats, handleStatusClick, handleRemoveClick, selectedTorrent } = this.props

    return (
      <section className='footer'>
        <ReactCSSTransitionGroup
          transitionName='footer-transition'
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}>
        {!!selectedTorrent && !isEmpty(selectedTorrent) &&
          <FooterActionButtons
            selectedTorrent={selectedTorrent}
            handleStatusClick={handleStatusClick}
            handleRemoveClick={handleRemoveClick} />
        }
        <FooterInfo
          controller={controller}
          stats={stats} />
        </ReactCSSTransitionGroup>
      </section>
    )
  }
})

export default connect(footerSelector)(FooterContainer)

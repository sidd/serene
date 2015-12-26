import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Sidebar from '../components/Sidebar'
import TorrentList from '../components/TorrentList'
import TorrentInfo from '../components/TorrentInfo'

const BodyContainer = React.createClass({
  propTypes: {
    controller: PropTypes.object,
    dispatch: PropTypes.func,
    torrents: PropTypes.object
  },

  componentWillMount () {
    const { controller, dispatch } = this.props
    dispatch(controller.getTorrents())
  },

  render () {
    const { dispatch, torrents } = this.props

    return (
      <section className='app__body'>
        <Sidebar />
        <TorrentList
          torrents={torrents}
          dispatch={dispatch} />
        <TorrentInfo />
      </section>
    )
  }
})

function mapStateToProps (state) {
  const { torrents } = state
  return { torrents }
}

export default connect(mapStateToProps)(BodyContainer)

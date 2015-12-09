import React from 'react'
import { connect } from 'react-redux'
import Sidebar from '../components/Sidebar'
import TorrentList from '../components/TorrentList'
import TorrentInfo from '../components/TorrentInfo'
import Header from '../components/Header'
import init from '../actions/init'

const AppContainer = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    torrents: React.PropTypes.array.isRequired
  },
  componentWillMount () {
    this.props.dispatch(init())
  },
  render () {
    return (
      <div className='app'>
        <Header />
        <div className='app__body'>
          <Sidebar />
          <TorrentList torrents={this.props.torrents} dispatch={this.props.dispatch} />
          <TorrentInfo />
        </div>
      </div>
    )
  }
})

export default connect(state => state)(AppContainer)

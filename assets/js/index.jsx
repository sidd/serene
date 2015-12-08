import React from 'react'
import { render } from 'react-dom'
import Sidebar from './components/Sidebar'
import TorrentList from './components/TorrentList'
import TorrentInfo from './components/TorrentInfo'
import Header from './components/Header'

require('../scss/index.scss')

const App = React.createClass({
  render () {
    return (
      <div className='app'>
        <Header />
        <div className='app__body'>
          <Sidebar />
          <TorrentList />
          <TorrentInfo />
        </div>
      </div>
    )
  }
})

render(<App />, document.getElementById('mount'))

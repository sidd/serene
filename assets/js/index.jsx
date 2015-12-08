import React from 'react'
import { render } from 'react-dom'
import Sidebar from './components/Sidebar'
import TorrentList from './components/TorrentList'
import TorrentInfo from './components/TorrentInfo'

require('../scss/index.scss')

const App = React.createClass({
  render () {
    return (
      <div className='app'>
        <Sidebar />
        <TorrentList />
        <TorrentInfo />
      </div>
    )
  }
})

render(<App />, document.getElementById('mount'))

import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import NavBar from './components/NavBar';
import Sequencer from './components/Sequencer'


const App = props => {
  return(
    <Router history={browserHistory}>
      <Route path='/' component={NavBar}>
        <IndexRoute component={Sequencer} />
      </Route>
    </Router>
  )
}

export default App;

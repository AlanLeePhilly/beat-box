import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import NavBar from './components/NavBar';
import SequencerContainer from './containers/SequencerContainer'


const App = props => {
  return(
    <Router history={browserHistory}>
      <Route path='/' component={NavBar}>
        <IndexRoute component={SequencerContainer} />
      </Route>
    </Router>
  )
}

export default App;

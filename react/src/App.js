import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import NavBar from './components/NavBar';
import Dashboard from './containers/Dashboard'
import reducer from './reducers';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  ));


const App = props => {
  return(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/' component={NavBar}>
          <IndexRoute component={Dashboard} />
        </Route>
      </Router>
    </Provider>
  )
}

export default App;

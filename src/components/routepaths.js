import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router';
import App from './App';
import CreateUserForm from './createuserform';
import LoginForm from './loginform';
import store, {history} from '../store';

class RoutePaths extends React.Component{
  render(){
    return(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={LoginForm}></IndexRoute>
            <Route path="/users/new" component={CreateUserForm}></Route>
          </Route>
        </Router>
      </Provider>
    )
  }
}

export default RoutePaths;

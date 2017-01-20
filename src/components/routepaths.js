import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router';
import store, {history} from '../store';
//components
import Connector from './connector';
import CreateUserForm from './users/new';
import ShowUser from './users/show';
import EditUser from './users/edit';
import Games from './games/index';
import CreateGameForm from './games/new';
import ShowGame from './games/show';
import LoginForm from './loginform';

class RoutePaths extends React.Component{
  render(){
    return(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Connector}>
            <IndexRoute component={LoginForm}></IndexRoute>
            <Route path="/user/new" component={CreateUserForm}></Route>
            <Route path="/users/:id" component={ShowUser}></Route>
            <Route path="/users/:id/edit" component={EditUser}></Route>
            <Route path="/games" component={Games}></Route>
            <Route path="/game/new" component={CreateGameForm}></Route>
            <Route path="/games/:id" component={ShowGame}></Route>
          </Route>
        </Router>
      </Provider>
    )
  }
}

export default RoutePaths;

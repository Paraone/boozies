import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import users from './users';
import games from './games';
import messages from './messages';

const rootReducer = combineReducers({users, games, messages, routing: routerReducer});

export default rootReducer;

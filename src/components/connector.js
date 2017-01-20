import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionsCreator from '../actions/actionsCreator';
import App from './App';

function mapStateToProps(state){
  return{
    users: state.users,
    games: state.games
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(actionsCreator, dispatch);
}

const Connector = connect(mapStateToProps, mapDispatchToProps)(App);

export default Connector;

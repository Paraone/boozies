import React from 'react';
import * as firebase from 'firebase';
import {browserHistory} from 'react-router';

import AllUsers from '../users/index';
import Chat from './chat';
//this component shows all available games or allows user to create a game
class Games extends React.Component{
  renderGames(){
    return(
      <div className="game">
        {`>List of games here<`}
      </div>
    );
  }

  handleLogout(){
    firebase.auth().signOut().then(
      ()=>{browserHistory.push('/')},
      (error)=>{console.log(error)}
    );
  }

  handleCreateGame(){
    this.props.createGame({game: 'myGame'});
  }

  componentWillMount() {

    const db = firebase.database();
    db.ref('users/').on('value', (snapshot)=>{
        //set initial state to snapshot.val()
        console.log(snapshot.val(), this.props.users);
        if(this.props.users != snapshot.val()) this.props.getUsers(snapshot.val());
      });

    this.user = firebase.auth().currentUser;
    if(!this.user) browserHistory.push('/');
  }

  render(){

    return (
      <div className="games">
      <div>Welcome {this.user ? this.user.displayName : ""}</div>
      <button onClick={this.handleCreateGame.bind(this)} >Create Game</button>
      <button onClick={this.handleLogout} >Log Out</button>
        {this.renderGames()}
      <Chat {...this.props}/>
      <AllUsers {...this.props} />
      </div>
    );
  }
}

export default Games;

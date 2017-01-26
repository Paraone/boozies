import React from 'react';
import * as firebase from 'firebase';
import {browserHistory, Link} from 'react-router';

import AllUsers from '../users/index';
import Chat from './chat';
import GameRoom from './gameroom';
//this component shows all available games or allows user to create a game
class Games extends React.Component{
  //rendering games list
  renderGames(){
    return(
      <div className="all-games">
        {
          Object.keys(this.props.games || {}).map((key, i)=>{
            return(
              <GameRoom key={key} i={key} userkey={this.userkey} {...this.props} />
            )
          })
        }
      </div>
    );
  }

  handleLogout(){
    //logging out user
    firebase.auth().signOut().then(
      ()=>{browserHistory.push('/')},
      (error)=>{console.log(error)}
    );
  }

  handleCreateGame(e){
    e.preventDefault();
    // getting for references
    const {createGameForm, roomname} = this.refs;
    console.log('Create Game clicked...');
    // creating game in store
    this.props.createGame(this.userkey, roomname.value);
    //creating game in db
    const db = firebase.database();
    const gameData = {
      uid: this.userkey,
      roomname: roomname.value,
      gamestate: 'ready',
      players: {}
    }
    gameData.players[this.userkey] = {
      x: 64,
      y: 64,
      playerstate: 'NOT_IT'
    }

    const updates = {};
    // sending gamedata to db
    updates[`/games/${this.userkey}`] = gameData;
    // updating userstore/:userid/roomname
    updates[`/userstore/${this.userkey}/roomname`] = roomname.value;
    db.ref().update(updates);
    browserHistory.push(`/games/${this.userkey}`);//sending player to room
  }

  componentWillMount() {
    const db = firebase.database();
    // updating users when new users join
    db.ref('userstore/').once('value').then((snapshot)=>{
        //set initial state to snapshot.val()
        this.props.getUsers(snapshot.val() || {});
    });
    // updating games when new users join
    db.ref('games/').once('value').then((snapshot)=>{
        this.props.getGames(snapshot.val() || {});
    });

    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        // setting the userkey (reference to id in db)
        this.userkey = user.displayName;
      }else{
        // if not logged in send to loggin
        browserHistory.push('/');
      }
    });
  }

  render(){
    return (
      <div className="games">
      <div>Welcome {this.userkey && this.props ? this.props.users[this.userkey].username : ""}</div>
      <form ref="createGameForm" onSubmit={(e)=> this.handleCreateGame(e)} className="create-game-form">
        <input type="text" placeholder="Room Name" ref="roomname" />
        <button type="submit">Create Room</button>
      </form>
      <button onClick={this.handleLogout} >Log Out</button>
        {this.props ? this.renderGames() : ""}
      <Chat userkey={this.userkey} {...this.props}/>
      <AllUsers {...this.props} />
      </div>
    );
  }
}

export default Games;

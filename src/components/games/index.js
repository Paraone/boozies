import React from 'react';
import * as firebase from 'firebase';
import {browserHistory, Link} from 'react-router';

import AllUsers from '../users/index';
import Chat from './chat';
import GameRoom from './gameroom';
//this component shows all available games or allows user to create a game
class Games extends React.Component{
  constructor() {
    super();
    this.joinRoom = this.joinRoom.bind(this);
  }
  renderGames(){
    return(
      <div className="sll-gamed">
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
    firebase.auth().signOut().then(
      ()=>{browserHistory.push('/')},
      (error)=>{console.log(error)}
    );
  }

  handleCreateGame(e){
    e.preventDefault();
    const {createGameForm, roomname} = this.refs;
    console.log('Create Game clicked...');
    this.props.createGame(this.userkey, roomname.value);
    const db = firebase.database();
    const gameData = {
      uid: this.userkey,
      roomname: roomname.value,
      gamestate: 'ready',
      players: {}
    }
    if(!gameData.players[this.userkey]){
      gameData.players[this.userkey] = {
        x: 64,
        y: 64,
        playerstate: 'NOT_IT'
      }
    }

    const updates = {};
    updates[`/games/${this.userkey}`] = gameData;
    updates[`/userstore/${this.userkey}/roomname`] = roomname.value;

    db.ref().update(updates);
    browserHistory.push(`/games/${this.userkey}`);
  }

  joinRoom(gameid){
    console.log(`Joining room ${this.props.games[gameid].roomname}`);
  }

  componentWillMount() {

    const db = firebase.database();
    db.ref('userstore/').on('value', (snapshot)=>{
        //set initial state to snapshot.val()
        this.props.getUsers(snapshot.val());
    });
    db.ref('games/').on('value',
      (snapshot)=>{
        this.props.getGames(snapshot.val() || {});
    });

    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.userkey = user.displayName;
      }else{
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

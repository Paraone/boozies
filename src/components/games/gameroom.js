import React from 'react';
import * as firebase from 'firebase';
import {browserHistory} from 'react-router';

class GameRoom extends React.Component{
  closeRoom(){
    console.log('closing room ...');
    const db = firebase.database();
    const players = this.props.games[this.props.i].players;
    for(let uid in players){
      // players[uid].gameroom = "";
      db.ref(`/userstore/${uid}/roomname`).remove();
    }
    db.ref(`/games/${this.props.i}`).remove();
  }


  joinRoom(){
  if(this.props.users[this.props.userkey].gameroom) {
    console.log("unser is in a room.");
    return;
  }
    console.log(`Joining room: ${this.props.games[this.props.i].roomname}...`);
    //add player to game
    const player = {
      x: 64,
      y: 64,
      playerstate: 'NOT_IT'
    }
    const db = firebase.database();

    let updates = {};
    updates[`/games/${this.props.i}/players/${this.props.userkey}`] = player;
    updates[`/userstore/${this.props.userkey}/roomname`] = this.props.games[this.props.i].roomname;
    if(!this.props.games[this.props.i].players[this.props.userkey]) db.ref().update(updates);
    else{
      console.log()
      return;
    }
    console.log("put player in room");
    console.log("sending player to room");
    browserHistory.push(`/games/${this.props.i}`);
  }

  render(){
    const {games, i, userkey} = this.props;
    const btn = (i === userkey) ?
      <span><button onClick={this.closeRoom.bind(this)}>Close Room</button></span> :
      <span><button onClick={this.joinRoom.bind(this)}>Join Room</button></span>;
    return (
      <div className="game" >
        <div>
        {games[i].roomname} {btn}
        </div>
      </div>
      )
  }
}

export default GameRoom;

import React from 'react';
import Canvas from '../canvas';
import * as firebase from 'firebase';
import {browserHistory} from 'react-router';
import {randomInt} from '../../helpers';

//this is the game room.
class ShowGame extends React.Component{

  constructor() {
    super();
    this.closeRoom = this.closeRoom.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  componentWillMount() {
    const user = firebase.auth().currentUser;
      if(user) this.userkey = user.displayName;
    this.db = firebase.database();
  }

  closeRoom(){
    console.log('closing room ...');
    const players = this.props.games[this.props.params.id].players;
    for(let uid in players){
      this.db.ref(`/userstore/${uid}/roomname`).remove();
    }
    this.db.ref(`/games/${this.props.params.id}`).remove().then(()=>{
      browserHistory.push('/games');
    });
  }

  startGame(){
    const players = this.props.games[this.props.params.id].players;
    const playersarr = Object.keys(players);
    const uid = randomInt(0, playersarr.length-1 );

    const updates = {};
    updates[`/games/${this.props.params.id}/gamestate`] = 'playing';
    updates[`/games/${this.props.params.id}/players/${playersarr[uid]}/playerstate`] = 'IT';

    this.db.ref().update(updates);
  }

  render(){
    return (
      <div>
        <button onClick={this.startGame}>Start Game</button>
        <button onClick={this.closeRoom}>Close Room</button>
        <Canvas userkey={this.userkey}  {...this.props}/>
      </div>
      )
  }
}

export default ShowGame;

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
    // getting reference to current user in db
    const user = firebase.auth().currentUser;
      if(user) this.userkey = user.displayName;
    // refernce to db
    this.db = firebase.database();
  }

  closeRoom(){
    //changes gamestate to closing
    console.log('closing room ...');
    const updates = {};
    updates[`/games/${this.props.params.id}/gamestate`] = 'closing';
    this.db.ref().update(updates);
  }

  startGame(){//changes gamestate to playing
    // ref to current players
    const players = this.props.games[this.props.params.id].players;
    const playersarr = Object.keys(players);// get player ids
    const uid = randomInt(0, playersarr.length-1 ); // get ref to random uid

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

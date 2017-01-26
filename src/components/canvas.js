import React, {Component, PropTypes} from 'react';
import * as PIXI from 'pixi.js';
import * as firebase from 'firebase';
import {randomInt} from '../helpers.js';
import {browserHistory} from 'react-router';

class Canvas extends Component{

  constructor(props) {
    super(props);

    //setting stage values
    this.stageheight = 768;
    this.stagewidth = 1024;
    //binding functions
    this.animate = this.animate.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
  }

  componentWillMount() {
    // db reference
    this.db = firebase.database();
    // currentGame's id
    this.currentGame = this.props.params.id;
    // flag to check wether to run animate()
    this.running = true;
    //winner's name
    this.winner = "";
  }

  //componentDidMount is used to grab the canvas container ref,
  // and hook up the pixi.js renderer
  componentDidMount() {
    //setup pixi Canvas in componentDidMount

    this.renderer = PIXI.autoDetectRenderer(this.stagewidth, this.stageheight);
    this.refs.gameCanvas.appendChild(this.renderer.view);

    //create the root of the scene graph
    this.stage = new PIXI.Container();
    this.stage.width = this.stagewidth;
    this.stage.height = this.stageheight;
    this.setup();
    //start game
    this.animate();
  }
  componentWillUnmount() {
    //stop animate()
    this.running = false;
  }

  //shouldComponentUpdate is used to check our new props against the current
  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps; //check if props have changed
  }

  //When props are new run appropriate function
  componentWillReceiveProps(nextProps) {
   //pass props to update player
   this.updatePlayers(nextProps);
  }

  setup(){
    const uid = this.props.userkey; //current user
    const player = this[`player_${uid}`]; //current user's circle graphic
    // this.player is the players in our game
    if(this.props){
      this.players = this.props.games[this.props.params.id].players;
      this.playerlist = [];
    }

    // setting up keyboard keys
    // custom function addapted from https://github.com/kittykatattack/learningPixi
    this.left_key = new Keyboard(37);
    this.up_key = new Keyboard(38);
    this.right_key =  new Keyboard(39);
    this.down_key =  new Keyboard(40);


    this.left_key.press = ()=>{
      this[`player_${uid}`].accelx = -0.2;
    };

    this.left_key.release = ()=>{
      this[`player_${uid}`].accelx = 0;
      if(this.right_key.isDown) this[`player_${uid}`].accelx = 0.2;
    };

    this.up_key.press = ()=>{
      this[`player_${uid}`].accely = -0.2;
    };

    this.up_key.release = ()=>{
      this[`player_${uid}`].accely = 0;
      if(this.down_key.isDown) this[`player_${uid}`].accely = 0.2;
    };

    this.right_key.press = ()=>{
      this[`player_${uid}`].accelx = 0.2;
    };

    this.right_key.release = ()=>{
      this[`player_${uid}`].accelx = 0;
      if(this.left_key.isDown) this[`player_${uid}`].accelx = -0.2;
    };

    this.down_key.press = ()=>{
      this[`player_${uid}`].accely = 0.2;
    };

    this.down_key.release = ()=>{
      this[`player_${uid}`].accely = 0;
      if(this.up_key.isDown) this[`player_${uid}`].accely = -0.2;
    };

    function Keyboard(keyCode){
      this.code = keyCode;
      this.isDown = false;
      this.isUp = true;
      this.press = ()=>{};
      this.release = ()=>{};

      this.downHandler = (event)=>{
        if(event.keyCode === this.code){
          if(this.isUp && this.press) this.press();
          this.isDown = true;
          this.isUp = false;
        }
        event.preventDefault();
      };

      this.upHandler = (event)=>{
        if(event.keyCode === this.code){
          if(this.isDown && this.release)this.release();
          this.isDown = false;
          this.isUp = true;
        }
        event.preventDefault();
      };

      window.addEventListener(
        "keyup", this.upHandler.bind(this), false
      );

      window.addEventListener(
        "keydown", this.downHandler.bind(this), false
      );
    }

    // creating gameScene
    this.gameScene = new PIXI.Container();
    this.stage.addChild(this.gameScene);//add gameScene to stage

    // creating gameOverScene
    this.gameOverScene = new PIXI.Container();
    this.gameOverScene.visible = false;
    this.stage.addChild(this.gameOverScene);//add gameOverScene to page

    // set background
    const bg = new PIXI.Graphics();
    bg.beginFill(0xaaaaaa);
    bg.drawRect(0, 0, this.stagewidth, this.stageheight);
    bg.endFill();
    this.gameScene.addChild(bg);

    this.winnertext = new PIXI.Text(`Someone is the WINNER!!!`, {
      font: "helvetica",
      fill: 0xffffff
    });
    this.winnertext.x = 64;
    this.winnertext.y = 64;
    this.gameOverScene.addChild(this.winnertext);

    this.gameState = this.ready;
  }

  movePlayer(){

    const uid = this.props.userkey;//reference to current user
    const player = this[`player_${uid}`];//current user's character

    let deccel = 0.1; //stopping inertia

    player.vx += player.accelx; //adding accel to velocity
    player.vy += player.accely;

    if(player.vx <0) player.vx += deccel; //stopping inertia
    if(player.vx >0) player.vx -= deccel;

    if(player.vy <0) player.vy += deccel;
    if(player.vy >0) player.vy -= deccel;

    if(player.vx > 7) player.vx = 7; // limiting velocity
    if(player.vx < -7) player.vx = -7;

    if(player.vy > 7) player.vy = 7;
    if(player.vy < -7) player.vy = -7;

    player.x += player.vx; // updating x value
    player.y += player.vy;

    if(player.x < 0){ // setting stage boundries
      player.x = this.stage.width-32;//player will end up on
    }else if(player.x > this.stagewidth){// opposite side of stage
      player.x = 32;
    }

    if(player.y < 0){
      player.y = this.stage.height-32;
    }else if(player.y > this.stageheight){
      player.y = 32;
    }

    this[`text_${uid}`].x = player.x; // updating username text x,y coord
    this[`text_${uid}`].y = player.y + 32;

    const updates = {} // sending updates to db
    updates[`/games/${this.props.params.id}/players/${this.props.userkey}/x`] = player.x;
    updates[`/games/${this.props.params.id}/players/${this.props.userkey}/y`] = player.y;
    this.db.ref().update(updates);
  }

  //adds player to stage
  addPlayers(){
    // current players obj
    this.players = this.props.games[this.props.params.id].players;
    Object.keys(this.players).forEach((id, i)=>{
      // if current player color is white otherwise blue
      const color = (id === this.props.userkey) ? 0xffffff : 0x0000ff;
      // if player is not included in playerlist add graphics
      if(!this.playerlist.includes(id)){
        this[`player_${id}`] = new PIXI.Graphics();
        const player = this[`player_${id}`];
        player.beginFill(color);
        player.drawCircle(0, 0, 16);
        player.endFill();
        player.x = this.players[id].x;
        player.y = this.players[id].y;
        player.vx = 0;
        player.vy = 0;
        this[`player_${id}`].accelx = 0;
        this[`player_${id}`].accely = 0;
        this[`player_${id}`].playerstate = 'NOT_IT';
        const fontstyle = {
          fontFamily: "Arial",
          fontSize: 20,
          fontFill: 0xffffff //for some reason text always appears black
        }
        // players username attached to player
        this[`text_${id}`] = new PIXI.Text(this.props.users[id].username, fontstyle);
        this[`text_${id}`].x = this.players[id].x;
        this[`text_${id}`].y = this.players[id].y - 48;
        this.gameScene.addChild(this[`text_${id}`]);
        this.gameScene.addChild(player);
        this.playerlist.push(id);
      }
    });
  }

  //update this.players
  updatePlayers(props){
    // updating players x and y values
    Object.keys(this.players).forEach((id)=>{
      if(id !== this.props.userkey){ // do not update current player
      this[`player_${id}`].x = props.games[this.props.params.id].players[id].x;
      this[`player_${id}`].y = props.games[this.props.params.id].players[id].y;

      this[`text_${id}`].x = this[`player_${id}`].x;
      this[`text_${id}`].y = this[`player_${id}`].y - 48;
      }
    });
  }

  //checking collisions with the boozied players
  checkCollisions(){
    //current user id
    const uid = this.props.userkey;
    // current players gfx
    const player = this[`player_${uid}`];
    // getting list of boozied player
    const boozies = Object.keys(this.props.games[this.currentGame].players).filter((id)=>{
      return this.props.games[this.currentGame].players[id].playerstate === 'IT';
    });

    // checking for collision against boozied if current player is not boozied
    if(!boozies.includes(uid)){
      boozies.forEach((id)=>{
        if(this.circleHit(player, this[`player_${id}`])){
          //changing current player to boozied in db if caught
          const updates = {};
          updates[`/games/${this.currentGame}/players/${uid}/playerstate`] = 'IT';
          this.db.ref().update(updates);
        }
      });
    }
  }

  circleHit(p1, p2){ // circle collision detection
    const dx = p1.x - p2.x; // Thanks MDN
    const dy = p1.y - p2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < p1.width/2 + p2.width/2;
  }

  //animate loop
  animate(){
    //update gamestate
    this.gameState();
    //render the stage
    this.renderer.render(this.stage);
    //run loop at 60 fps
    if(this.running){
      this.frame = requestAnimationFrame(this.animate);
    }
  }

  //ready
  ready(){
    const gamestate = this.props.games[this.props.params.id].gamestate;
    //addPlayers if any
    this.addPlayers();
    //move player
    this.movePlayer();
    if(gamestate !== 'ready'){
      this.gameState = this[gamestate];
    }
  }

  //gamestate functions
  playing(){
    // reference to current game
    const game = this.props.games[this.currentGame];
    Object.keys(game.players).forEach((id)=>{
      //changing player graphix if not yet changed
      if(game.players[id].playerstate === 'IT' && this[`player_${id}`].playerstate !== 'IT'){
        this[`player_${id}`].clear();
        this[`player_${id}`].beginFill(0xffff00);
        this[`player_${id}`].drawCircle(0, 0, 18);
        this[`player_${id}`].endFill();
        this[`player_${id}`].playerstate === 'IT';
      }
    });
    //move player
    this.movePlayer();
    //check collisions
    this.checkCollisions();
    //see if game is over?
    const playersleft = Object.keys(this.props.games[this.currentGame].players)
      .filter((id)=>{
        return this.props.games[this.currentGame].players[id].playerstate !== 'IT';
      });
    // end game if only 1 player is not "it"
    if(playersleft.length === 1){
      const winner = this.props.users[playersleft[0]].username;

      this.winnertext.text = `${winner} is the WINNER!!!!`
      const updates = {};// updating gamestate
      updates[`/games/${this.currentGame}/gamestate`] = 'gameover';
      this.db.ref().update(updates);
    }
    //change this.gameState if gamestate changes
    if(game.gamestate !== 'playing'){
      this.gameState = this[game.gamestate];
    }
  }

  //gameover()
  gameover(){
    // current game
    const game = this.props.games[this.currentGame];
    // change game scene
    this.gameScene.visible = false;
    this.gameOverScene.visible = true;
    // change gamestate if gamestate changes
    if(game.gamestate !== 'gameover'){
      this.gamestate = this[game.gamestate];
    }
  }

  closing(){
    // current game
    const game = this.props.games[this.currentGame];
    // removing players from room
    if(this.currentGame !== this.props.userkey) browserHistory.push('/games');
    // removing roomname from users in db
    const players = this.props.games[this.currentGame].players;
    for(let uid in players){
      this.db.ref(`/userstore/${uid}/roomname`).remove();
    }
    //removing game from db and redirecting current user to lobby
    this.db.ref(`/games/${this.props.params.id}`).remove().then(()=>{
      browserHistory.push('/games');
    });
  }

  //Render our container that will store our pixijs game canvas. store ref
  render(){
    return(
      <div className="game-canvas-container" ref="gameCanvas"></div>
    );
  }
}

export default Canvas;

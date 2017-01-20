import React from 'react';
// this is the create game form.
class CreateGameForm extends React.Component{
  handleSubmit(e){
    e.preventDefault();
    console.log("Creating Game");
  }
  render(){
    return (
      <form onSubmit={(e)=> this.handleSubmit(e)} className="create-game-form">
        <input type="text" placeholder="Room Name" ref="roomname" />
        <button type="submit">Create Room</button>
      </form>
    );
  }
}

export default CreateGameForm;

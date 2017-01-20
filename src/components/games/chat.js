import React from 'react';

class Chat extends React.Component{
  render(){
    return (
      <div className="chat">
        <h2>Lobby Chat:</h2>
        <div><textarea ref="lobby-chat" cols="30" rows="10"></textarea></div>
        <div>
          <input type="text"/>
          <button>Send</button>
        </div>
      </div>
      )
  }
}

export default Chat;

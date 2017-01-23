import React from 'react';
import * as firebase from 'firebase';

class Chat extends React.Component{

  componentWillMount() {
    this.db = firebase.database();
    this.db.ref('messages/').on('value', (snapshot)=>{
      this.props.getMessages(snapshot.val());
    });
  }

  sendMessage(){
    console.log("Message sending");
    const messagekey = this.db.ref().child('messages').push().key;
    const message = {
      uid: this.props.userkey,
      text: this.refs.message.value
    }
    const updates = {};
    updates[`/messages/${messagekey}`] = message;
    this.db.ref().update(updates);
  }

  render(){
    const messages = this.props.messages;
    const uid = this.props.userkey;
    return (
      <div className="chat">
        <h2>Lobby Chat:</h2>
        <div className="messages">
        {
          Object.keys(messages || {}).map((id, i)=>{
            return(
              <div key = {i}>
                <span>{this.props.users[messages[id].uid].username}:</span> {messages[id].text}
              </div>
            )
          })
        }
        </div>
        <div>
          <input ref="message" type="text"/>
          <button onClick={this.sendMessage.bind(this)}>Send</button>
        </div>
      </div>
      )
  }
}

export default Chat;

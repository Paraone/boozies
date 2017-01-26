import React from 'react';
import * as firebase from 'firebase';

class Chat extends React.Component{

  componentWillMount() {
    // get reference to db
    this.db = firebase.database();
    // on value change get new messages
    this.db.ref('messages/').on('value', (snapshot)=>{
      this.props.getMessages(snapshot.val());
    });
  }

  sendMessage(){
    console.log("Message sending");
    if(!this.refs.message.value){
      console.log("no message in input");
      return;
    }
    //getting new id for message in db
    const messagekey = this.db.ref().child('messages').push().key;
    //setting message obj
    const message = {
      uid: this.props.userkey,
      text: this.refs.message.value
    }
    const updates = {};// updating db
    updates[`/messages/${messagekey}`] = message;
    this.db.ref().update(updates);
  }

  handleSend(e){
    e.preventDefault();
    console.log('handle send...');
    this.sendMessage();
    this.refs.form.reset();
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
        <form ref="form" onSubmit={(e)=>this.handleSend(e)}>
          <input ref="message" type="text"/>
          <button type="submit">Send</button>
        </form>
      </div>
      )
  }
}

export default Chat;

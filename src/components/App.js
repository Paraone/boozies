import React, { Component } from 'react';
import {Link} from 'react-router';
import '../App.css';
import * as firebase from 'firebase';

// Parent component for site.
class App extends Component {

  componentWillMount() {
    //this is the main configuration for
    //communication with the firebase db.
    const config = {
      apiKey: "AIzaSyDdWOo6VVNJWAtB-AN9-YxfkBX6a_IApFk",
      authDomain: "boozies-f1364.firebaseapp.com",
      databaseURL: "https://boozies-f1364.firebaseio.com",
      storageBucket: "boozies-f1364.appspot.com",
      messagingSenderId: "18631566846"
    }
    //Initialize firebase in App to use info in all
    //components
    firebase.initializeApp(config);
    const db = firebase.database();
    //getUsers for initial state.
    db.ref('/userstore/').on('value', (snapshot)=>{
      this.props.getUsers(snapshot.val());
    });
    //getGames for initial state
    db.ref('/games').on('value', (snapshot)=>{
      this.props.getGames(snapshot.val());
    });
  }

  render() {
    return (
      <div className="App">
        <Link to="/">Boozies</Link>
        {//sending props to all children
        }
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
}

export default App;

import React, { Component } from 'react';
import {Link} from 'react-router';
import '../App.css';
import * as firebase from 'firebase';

// Parent component for site.
class App extends Component {

  componentWillMount() {
      const config = {
      apiKey: "AIzaSyDdWOo6VVNJWAtB-AN9-YxfkBX6a_IApFk",
      authDomain: "boozies-f1364.firebaseapp.com",
      databaseURL: "https://boozies-f1364.firebaseio.com",
      storageBucket: "boozies-f1364.appspot.com",
      messagingSenderId: "18631566846"
    }
    firebase.initializeApp(config);
    const db = firebase.database();
    db.ref('/userstore/').on('value', (snapshot)=>{
      this.props.getUsers(snapshot.val());
    });
    db.ref('/games').on('value', (snapshot)=>{
      this.props.getGames(snapshot.val());
    });
  }

  render() {
    return (
      <div className="App">
        <Link to="/">Boozies</Link>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
}

export default App;

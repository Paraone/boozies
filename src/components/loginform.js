import React from 'react';
import {browserHistory, Link} from 'react-router';
import * as firebase from 'firebase';

class LoginForm extends React.Component{
  handleSubmit(e){
    e.preventDefault();
    console.log("Logging user in.");
    const {email, password, loginForm} = this.refs;
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
      .catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
      }).then(()=>{
        window.booziesuser = firebase.auth().currentUser;
        // user ? browserHistory.push('/games') : loginForm.reset();
        if(window.booziesuser){
          console.log(`User logged in as ${window.booziesuser.email}`)
          browserHistory.push('/games');
        }else{
          loginForm.reset();
        }
      });
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user)=>{
    if(user) browserHistory.push('/games');
    });
  }

  render(){
    return(
      <form ref="loginForm" onSubmit={e=>this.handleSubmit(e)} className="login-form">
        <fieldset>
          <legend>Login</legend>
          <div>
            <label htmlFor="email">Email: </label>
            <input type="text" placeholder="email" ref="email" />
          </div>
          <div>
          <label htmlFor="password">Password: </label>
          <input type="password" placeholder="Password" ref="password" />
          </div>
          <button type="submit">Login</button>
        </fieldset>
        <div>Not a user? <Link to="/user/new">Sign Up!</Link></div>
      </form>
    );
  }
}

export default LoginForm;

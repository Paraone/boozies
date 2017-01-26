import React from 'react';
import {browserHistory, Link} from 'react-router';
import * as firebase from 'firebase';

class LoginForm extends React.Component{
  handleSubmit(e){
    e.preventDefault();
    console.log("Logging user in.");
    // geting references to form
    const {email, password, loginForm} = this.refs;
    //login user
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
      .catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
      }).then(()=>{
        this.booziesuser = firebase.auth().currentUser;
        // user ? browserHistory.push('/games') : loginForm.reset();
        if(this.booziesuser){
          console.log(`User logged in as ${this.booziesuser.email}`)
          //redirecting to lobby
          browserHistory.push('/games');
        }else{// if user not logged in reset form
          loginForm.reset();
        }
      });
  }

  componentWillMount() {
    // if user is logged in redirect to lobby
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

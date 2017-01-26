import React from 'react';
import * as firebase from 'firebase';
import {browserHistory} from 'react-router';
// Create user with this form.
class CreateUserForm extends React.Component{
  handleSubmit(e){
    e.preventDefault();
    // get form refs
    const {email, password, username} = this.refs;
    //create user
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
      .catch((error)=>{
        // handle error
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        return;
    }).then(()=>{
      const user = firebase.auth().currentUser;
      if(user){

        const db = firebase.database();
        //creating key for uid in db
        const userkey = db.ref('userstore').push().key;

        console.log(`creating ${username.value} at /userstore/${userkey}`);
        user.updateProfile({ // a little hack to get uid from authentication when logged in
          displayName: userkey
        });


        const userData = {
          uid: userkey, //uid is the generated key not uid from authentication
          username: username.value,
          email: email.value,
          roomname: ""
        }

        const updates = {};
        updates[`/userstore/${userkey}`] = userData;
        db.ref().update(updates);
        // send user to homepage or lobby if logged in
        browserHistory.push('/');
      }else{
        //clear form
        this.refs.createUserForm.reset()
      }
    });
  }

  render(){
    return(
      <form ref="createUserForm" onSubmit={e=>this.handleSubmit(e)} className="create-user-form">
        <fieldset>
          <legend>Create Account</legend>
          <div>
            <label htmlFor="username">Username: </label>
            <input type="text" placeholder="Username" ref="username" name="username" required/>
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input type="text" placeholder="Email" ref="email" name="email" required/>
          </div>
          <div>
          <label htmlFor="password">Password: </label>
          <input type="password" placeholder="Password" name="password" ref="password" required/>
          </div>
          <button type="submit">Create Account</button>
        </fieldset>
      </form>
    );
  }
}

export default CreateUserForm;

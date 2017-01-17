import React from 'react';
import {Link} from 'react-router';

class LoginForm extends React.Component{
  handleSubmit(e){
    e.preventDefault();
    console.log("Logging user in.");

  }
  render(){
    return(
      <form onSubmit={e=>this.handleSubmit(e)} className="login-form">
        <fieldset>
          <legend>Login</legend>
          <div>
            <label htmlFor="username">Username: </label>
            <input type="text" placeholder="Username" ref="username" />
          </div>
          <div>
          <label htmlFor="password">Password: </label>
          <input type="text" placeholder="Password" ref="password" />
          </div>
          <button type="submit">Login</button>
        </fieldset>
        <div>Not a user? <Link to="/users/new">Sign Up!</Link></div>
      </form>
    );
  }
}

export default LoginForm;

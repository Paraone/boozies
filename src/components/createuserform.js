import React from 'react';

class CreateUserForm extends React.Component{
  handleSubmit(e){
    e.preventDefault();
    console.log("Creating user.");
  }
  render(){
    return(
      <form onSubmit={e=>this.handleSubmit(e)} className="create-user-form">
        <fieldset>
          <legend>Create Account</legend>
          <div>
            <label htmlFor="username">Username: </label>
            <input type="text" placeholder="Username" ref="username" />
          </div>
          <div>
          <label htmlFor="password">Password: </label>
          <input type="text" placeholder="Password" ref="password" />
          </div>
          <button type="submit">Create Account</button>
        </fieldset>
      </form>
    );
  }
}

export default CreateUserForm;

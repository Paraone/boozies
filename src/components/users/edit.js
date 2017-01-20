import React from 'react';
// users account page.
class EditUser extends React.Component{
  render(){
    return (
      <form onSubmit={e=>this.handleSubmit(e)} className="edit-account-form">
        <fieldset>
          <legend>Edit Account</legend>
          <div>
            <label htmlFor="username">Username: </label>
            <input type="text" placeholder="Username" ref="username" />
          </div>
          <div>
          <label htmlFor="password">Password: </label>
          <input type="text" placeholder="Password" ref="password" />
          </div>
          <button type="submit">Edit Account</button>
        </fieldset>
      </form>
    )
  }
}

export default EditUser;

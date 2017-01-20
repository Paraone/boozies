import React from 'react';
//this will show all users.
class AllUsers extends React.Component{
  render(){
    return(
      <div className="all-users">
      <h2>Users:</h2>
      {Object.keys(this.props.users || {})
        .map((key)=>{
          return(
            <div key={key}>
              <h3>{this.props.users[key].username}</h3>
              <div>{this.props.users[key].email}</div>
            </div>
          )
        })
      }
      </div>
    );
  }
}

export default AllUsers;

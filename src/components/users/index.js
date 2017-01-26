import React from 'react';
//this will show all users.
class AllUsers extends React.Component{
  render(){
    return(
      <div className="all-users">
      <h2>Users:</h2>
      {Object.keys(this.props.users || {}) // display users and room
        .map((key)=>{
          return(
            <div key={key}>
              <h4>{this.props.users[key].username}</h4>
              <div>{this.props.users[key].roomname}</div>
            </div>
          )
        })
      }
      </div>
    );
  }
}

export default AllUsers;

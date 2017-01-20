//create users
export function createUser(uid, username, email){
  return{
    type: 'CREATE_USER',
    uid,
    username,
    email
  }
}

export function deleteUser(uid){
  return{
    type: 'DELETE_USER',
    uid
  }

}

export function createGame(game){
  return{
    type: 'CREATE_GAME',
    game
  }
}

export function getUsers(users){
  return{
    type: 'GET_USERS',
    users
  }
}

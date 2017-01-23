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

export function createGame(uid, room_name){
  return{
    type: 'CREATE_GAME',
    uid,
    room_name
  }
}

export function getMessages(messages){
  return{
    type: 'GET_MESSAGES',
    messages
  }
}

export function getUsers(users){
  return{
    type: 'GET_USERS',
    users
  }
}

export function getGames(games){
  return{
    type: 'GET_GAMES',
    games
  }
}

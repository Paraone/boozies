function users(state = [], action){
  switch(action.type){
    case 'CREATE_USER':
      return [
        ...state,
        {
          uid: action.uid,
          email: action.email,
          username: action.username
        }
      ];
    case 'GET_USERS':
      return action.users;
    case 'DELETE_USER':
      return [
        ...state.slice(0, action.i),
        ...state.slice(action.i+1)
      ]
    default:
      return state;
  }
}

export default users;

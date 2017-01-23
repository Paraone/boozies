function games(state = [], action){
  switch(action.type){
    case 'CREATE_GAME':
      return [
        ...state,
          {
            uid: action.uid,
            roomname: action.room_name,
            status: 'NOT_READY',
            players: [action.uid]
          }
      ];
    case 'GET_GAMES':
      return action.games;
    default:
      return state;

  }
}

export default games;

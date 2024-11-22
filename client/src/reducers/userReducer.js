export const initialState = null;

export const reducer = (state, action) => {
  switch (action.type) {
    case 'USER':
      return action.payload;

    case 'CLEAR':
      return null;

    case 'UPDATE':
      // Handle the case where state is null (initial state) by ensuring it has a default structure
      return {
        ...state,
        followers: action.payload.followers,
        following: action.payload.following,
      };

    case 'UPDATEPIC':
      return {
        ...state,
        pic: action.payload,
      };

    default:
      return state;
  }
};

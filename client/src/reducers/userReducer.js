export const initialState = null;

export const reducer = (state, action) => {
    if (action.type === "USER") {  // Use strict equality (===)
        return action.payload;
    }
    if (action.type === "CLEAR") {  // Use strict equality (===)
        return null;
    }
    if (action.type === "UPDATE") {  // Use strict equality (===)
        return {
            ...state,
            followers: action.payload.followers,
            following: action.payload.following
        };
    }
    if (action.type === "UPDATEPIC") {  // Use strict equality (===)
        return {
            ...state,
            pic: action.payload
        };
    }
    return state;
};

export const initialState = null;

export const reducer = (state = initialState, action) => {
    console.log(`Action Type: ${action.type}`, action.payload);
    switch (action.type) {
        case "USER":
            return action.payload;
        case "CLEAR":
            return null;
        case "UPDATE":
            if (action.payload && action.payload.followers && action.payload.following) {
                return {
                    ...state,
                    followers: action.payload.followers,
                    following: action.payload.following
                };
            }
            console.error("Invalid payload for UPDATE action");
            return state;
        case "UPDATEPIC":
            if (action.payload && action.payload.pic) {
                return {
                    ...state,
                    pic: action.payload.pic
                };
            }
            console.error("Invalid payload for UPDATEPIC action");
            return state;
        default:
            console.warn(`Unhandled action type: ${action.type}`);
            return state;
    }
};

import { SET_AUTH, LOGOUT } from "../actions/authActions.js";

const initialState = {
  user: null,
  token: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    //case "SET_AUTH":
    //If using sctions from a imported file
    case SET_AUTH:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    //case "LOGOUT":
    //If using sctions from a imported file
    case LOGOUT:
      return {
        ...state,
        user: null,
        token: "",
      };
    default:
      return state;
  }
};

export default authReducer;

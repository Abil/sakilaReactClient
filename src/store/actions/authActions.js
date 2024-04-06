// Action Types
export const SET_AUTH = "SET_AUTH";
export const LOGOUT = "LOGOUT";

// Action Creators
export const rSetAuth = (user, token) => ({
  type: SET_AUTH,
  payload: { user, token },
});

export const rLogout = () => ({
  type: LOGOUT,
});

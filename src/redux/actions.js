import * as actions from "./actionTypes";

const url = "http://localhost:4000/api/v1/";
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

function setAuthorizationToken(token) {
  if (token) {
    myHeaders.append(`Authorization`, `Bearer ${token}`);
  }
}

setAuthorizationToken(localStorage.jwtToken);

// eventually will need to pass in a user ID based on who is logged in
export const getEvents = () => {
  return function (dispatch) {
    setAuthorizationToken(localStorage.jwtToken);
    fetch(`${url}users/45`, {
      headers: myHeaders,
    })
      .then((r) => r.json())
      .then((userInfo) =>
        dispatch({
          type: actions.GET_FOLLOWED_EVENTS,
          payload: userInfo.followed_events.flat(),
        })
      );
  };
};

// eventually will need to pass in a user ID based on who is logged in
export const fetchUsers = () => {
  return function (dispatch) {
    setAuthorizationToken(localStorage.jwtToken);
    fetch(`${url}users/45`, {
      headers: myHeaders,
    })
      .then((r) => r.json())
      .then((userInfo) =>
        dispatch({
          type: actions.GET_FOLLOWED_USERS,
          payload: userInfo.you_follow,
        })
      );
  };
};

export const fetchAllUsers = () => {
  return function (dispatch) {
    setAuthorizationToken(localStorage.jwtToken);
    fetch(`${url}users`, {
      headers: myHeaders,
    })
      .then((r) => r.json())
      .then((usersArray) =>
        dispatch({ type: actions.GET_ALL_USERS, payload: usersArray })
      );
  };
};

// auth actions
export const logIn = (userData) => {
  return function (dispatch) {
    fetch(`${url}login`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(userData),
    })
      .then((r) => r.json())
      .then((userData) => {
        const token = userData.jwt;
        localStorage.setItem("jwtToken", token);
      });
  };
  // dispatch({type: actions.GET_ALL_USERS, payload: usersArray})
};

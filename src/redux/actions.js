import * as actions from "./actionTypes";
// import jwt from 'jsonwebtoken'

const url = "http://localhost:4000/api/v1";
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

function setAuthorizationToken(token) {
  if (token) {
    myHeaders.append(`Authorization`, `Bearer ${token}`);
  }
}

setAuthorizationToken(localStorage.jwtToken);

export const getFollowedEvents = (id) => {
  return function (dispatch) {
    setAuthorizationToken(localStorage.jwtToken);
    fetch(`${url}/users/${id}`, {
      headers: myHeaders,
    })
      .then((r) => r.json())
      .then((userInfo) => {
        dispatch({
          type: actions.GET_FOLLOWED_EVENTS,
          payload: userInfo.followed_events.flat()
        })
      }
      );
  };
};

export const getEvents = () => {
  return function(dispatch) {
    fetch(`${url}/events`, {
      headers: myHeaders
    })
      .then(r => r.json())
      .then(console.log)
  }
}

export const fetchUsers = (id) => {
  return function (dispatch) {
    setAuthorizationToken(localStorage.jwtToken);
    fetch(`${url}/users/${id}`, {
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
    fetch(`${url}/users`, {
      headers: myHeaders,
    })
      .then((r) => r.json())
      .then((usersArray) =>
        dispatch({ type: actions.GET_ALL_USERS, payload: usersArray })
      );
  };
};


export const newFollow = (followObj) => {
    return function(dispatch) {
        fetch(`${url}/follows`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(followObj)
        })
            .then(r => r.json())
            .then(newFollow => dispatch({type: actions.ADD_FOLLOWER, payload: newFollow.follow.followee}))
    }
}

export const deleteFollow = (followerId, followeeId) => {
    return function(dispatch) {
      fetch(`${url}/follows/${followerId}&${followeeId}`, {
          method: "DELETE",
          headers: myHeaders
      })
          .then(dispatch({type: actions.DELETE_FOLLOW, payload: followeeId}))
    }
}


export const newEvent = (eventObj) => {
  return function(dispatch){
    fetch(`${url}/events`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(eventObj)
    })
      .then(r => r.json())
      .then(console.log)
  }
}


export const deleteEvent = (eventId) => {
  return function(dispatch) {
    fetch(`${url}/events/${eventId}`, {
        method: "DELETE",
        headers: myHeaders
    })
        .then(dispatch({type: actions.DELETE_EVENT, payload: eventId}))
  }
}



// auth actions
export const logIn = (userData) => {
  return function (dispatch) {
    fetch(`${url}/login`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(userData),
    })
      .then((r) => r.json())
      .then((userData) => {
        const token = userData.jwt;
        localStorage.setItem("jwtToken", token);
        return dispatch({type: actions.SET_CURRENT_USER, payload: userData.user})
      });
  };
};

export const checkLogin = (token) => {
    return function (dispatch) {
        fetch(`${url}/profile`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`} 
        })
            .then(r => r.json())
            .then((user) => dispatch({type: actions.SET_CURRENT_USER, payload: user.user}))
    }
}

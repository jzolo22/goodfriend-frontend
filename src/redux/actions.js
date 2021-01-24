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

// ------------------------------------------------ Initial followed users/events ------------------------------------------------ //


export const getFollowedEvents = (id) => {
  return function (dispatch) {
    setAuthorizationToken(localStorage.jwtToken);
    fetch(`${url}/users/${id}`, {
      headers: myHeaders,
    })
      .then((r) => r.json())
      .then((userInfo) => {
        if (userInfo.followed_events.length > 0) {
          console.log(userInfo)
           dispatch({
          type: actions.GET_FOLLOWED_EVENTS,
          payload: userInfo.followed_events.flat()
        })
        }
      }
      );
  };
};



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


// ------------------------------------------------ Follow ------------------------------------------------ //

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


// ------------------------------------------------ Event ------------------------------------------------ //

export const getEvents = () => {
  return function(dispatch) {
    fetch(`${url}/events`, {
      headers: myHeaders
    })
      .then(r => r.json())
      .then(eventsArray => dispatch({type: actions.GET_ALL_EVENTS, payload: eventsArray}))
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
      .then(newEvent => dispatch({type: actions.ADD_EVENT, payload: newEvent}))
  }
}


export const editEvent = (eventId, eventObj) => {
  return function(dispatch) {
    fetch(`${url}/events/${eventId}`, {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify(eventObj)
    })
      .then(r => r.json())
      .then(updatedEvent => dispatch({type: actions.UPDATE_EVENT, payload: updatedEvent}))
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
// ------------------------------------------------ User Profile ------------------------------------------------ //

export const editProfile = (userId, userObj) => {
  return function (dispatch) {
      fetch(`${url}/users/${userId}`, {
        method: "PATCH",
        headers: myHeaders,
        body: JSON.stringify(userObj)
      })
        .then(r => r.json())
        .then(console.log)
  }
}
// ------------------------------------------------ Items ------------------------------------------------ //
export const getItems = () => {
  return function(dispatch) {
    fetch(`${url}/items`, {
      headers: myHeaders,
    })
      .then(r => r.json())
      .then(itemsArray => dispatch({type: actions.ALL_ITEMS, payload: itemsArray}))
  }
}

export const addItem = (itemObj) => {
  return function(dispatch) {
      fetch(`${url}/items`, {
          method: "POST",
          headers: myHeaders, 
          body: JSON.stringify(itemObj)
      })
          .then(r => r.json())
          .then(itemObj => dispatch({type: actions.ADD_ITEM, payload: itemObj.item}))
  }
}

export const deleteItem = (id) => {
  return function(dispatch) {
    fetch(`${url}/items/${id}`, {
        method: "DELETE",
        headers: myHeaders
    })
        .then(dispatch({type: actions.DELETE_ITEM, payload: id}))
  }
}

export const purchaseItem = (id) => {
  return function(dispatch) {
    fetch(`${url}/items/${id}`, {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify({purchased: true})
    })
      .then(r => r.json())
      .then(updatedItem => dispatch({type: actions.UPDATE_ITEM, payload: updatedItem}))
  }
}

export const returnItem = (id) => {
  return function(dispatch) {
    fetch(`${url}/items/${id}`, {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify({purchased: false})
    })
      .then(r => r.json())
      .then(updatedItem => dispatch({type: actions.UPDATE_ITEM, payload: updatedItem}))
  }
}


// ------------------------------------------------ User Acct. Actions ------------------------------------------------ //

export const logIn = (userData) => {
  return function (dispatch) {
    fetch(`${url}/login`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(userData),
    })
      .then((r) => r.json())
      .then((userData) => {
        console.log(userData)
        if (userData.user && userData.jwt) {
        const token = userData.jwt;
        localStorage.setItem("jwtToken", token);
        return dispatch({type: actions.SET_CURRENT_USER, payload: userData.user})
      } else {
        window.alert("Please try again. The username or password was incorrect.")
      }
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

export const newUser = (userObj, history, newEvent=null) => {
  console.log(newEvent)
  return function(dispatch) {
    fetch(`${url}/users`, {
      method: "POST",
      body: userObj
    })
    .then(r => r.json())
    .then(newUser => {
        if (newUser.user && newUser.jwt) {
          const token = newUser.jwt;
          localStorage.setItem("jwtToken", token);
          dispatch({type: actions.SET_CURRENT_USER, payload: newUser.user})
          history.push('/')

            fetch(`${url}/wishlists`, {
              method: "POST",
              headers: myHeaders,
              body: JSON.stringify({user_id: newUser.user.id})
            })  
              .then(r => r.json())
              .then(console.log)

          if (newEvent){
              newEvent["user_id"] = newUser.user.id
              fetch(`${url}/events`, {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(newEvent)
            })
              .then(r => r.json())
              .then(newEvent => dispatch({type: actions.ADD_EVENT, payload: newEvent}))
        }
      } else {
        window.alert("Please try again. That username was already taken.")
      }
    })
    .catch(console.log)
  }
}

export const logOut = () => {
  return function(dispatch) {
    localStorage.removeItem("jwtToken")
    dispatch({type: actions.LOG_OUT, payload: {}})
  }
}
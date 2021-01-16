import * as actions from './actionTypes'

const url = "http://localhost:4000/api/v1/"

// eventually will need to pass in a user ID based on who is logged in
export const getEvents = () => {
    return function (dispatch) {
        fetch(`${url}users/32`)
            .then(r => r.json())
            .then(userInfo => dispatch({type: actions.GET_FOLLOWED_EVENTS, payload: userInfo.followed_events.flat()}))
    }
}

// eventually will need to pass in a user ID based on who is logged in
export const fetchUsers = () => {
    return function (dispatch) {
        fetch(`${url}users/32`)
            .then(r => r.json())
            .then(userInfo => dispatch({type: actions.GET_FOLLOWED_USERS, payload: userInfo.you_follow}))
    }
}

export const fetchAllUsers = () => {
    return function (dispatch) {
        fetch(`${url}users`)
            .then(r => r.json())
            .then(usersArray => dispatch({type: actions.GET_ALL_USERS, payload: usersArray}))
    }
}

// export const logIn = (userObj) => {
//     return function(dispatch) {
//         if (userObj === undefined){
//             const userData = localStorage.getItem("USER_DATA")
//             let userDataObj = JSON.parse(userData)
//             if (userDataObj){
//                 console.log("user data from local storage ", userDataObj)
//                 return dispatch({type: actions.LOG_IN, payload: userDataObj})
//             }
//         }
//         fetch(`${url}users/login`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accepts": "application/json"
//             },
//             body: JSON.stringify(userObj)
//         })
//             .then(r => r.json())
//             .then(data => {
//                 if (data.id) {
//                     console.log("found user", data['username'])
//                     localStorage.setItem("USER_DATA", JSON.stringify(data))
//                     dispatch({type: actions.LOG_IN, payload: data})
//                 } else {
//                     console.log("user not found")
//                     window.alert("wrong username or password")
//                 }
//             })
//             .catch(console.log)
//     }
// }

// export const signUp = (userObj) => {
//     return function(dispatch) {
//         fetch(`${url}users`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accepts": "application/json"
//             },
//             body: JSON.stringify(userObj)
//         })
//         .then(r => r.json())
//         .then(data => {
//             if (!data.id) {
//                 console.log("user creation failed")
//                 window.alert("enter username and password")
//             } else {
//                 localStorage.setItem("USER_DATA", JSON.stringify(data))
//                 dispatch({type: actions.SIGN_UP, payload: data})
//             }
//         })
//         .catch(console.log)
//     }
// }

export const logOut = () => {
    localStorage.removeItem("USER_DATA")
    return {type: actions.LOG_OUT}
}
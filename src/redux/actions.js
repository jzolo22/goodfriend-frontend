import * as actions from './actionTypes'

// to use (example): actions.BUG_ADDED

const url = "http://localhost:4000/api/v1/"

// eventually will need to pass in a user ID based on who is logged in
export const getEvents = () => {
    return function (dispatch) {
        fetch(`${url}users/11`)
            .then(r => r.json())
            .then(userInfo => dispatch({type: actions.GET_EVENTS, payload: userInfo.followed_events}))
    }
}
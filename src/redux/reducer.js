import { combineReducers } from 'redux'
import * as actions from './actionTypes'

const initialState = {
    followedEvents: [],
    ownEvents: [],
    followedUsers: [],
    allUsers: [],
    currentUser: {}
}

function followedEventsReducer(state = initialState.followedEvents, action) {
    switch(action.type){
        case actions.GET_FOLLOWED_EVENTS:
            return action.payload
        default:
            return state
    }
}

function ownEventsReducer(state = initialState.ownEvents, action) {
    switch(action.type){
        case actions.GET_OWN_EVENTS:
            console.log("ownevents reducer ", action.payload)
            return action.payload
        default:
            return state
    }
}

function followedUserReducer(state = initialState.followedUsers, action) {
    switch(action.type){
        case actions.GET_FOLLOWED_USERS:
            return action.payload
        case actions.ADD_FOLLOWER:
            console.log(action.payload)
            return [action.payload, ...state]
        case actions.DELETE_FOLLOW:
            let newArray = [...state]
            let index = newArray.findIndex(user => user.id === action.payload)
            newArray.splice(index, 1)
            return newArray
        default:
            return state
    }
}

function allUserReducer(state = initialState.allUsers, action){
    switch(action.type) {
        case actions.GET_ALL_USERS:
            return action.payload
        default:
            return state
    }
}

function currentUserReducer(state = initialState.currentUser, action) {
    switch(action.type) {
        case actions.SET_CURRENT_USER:
            return action.payload
        case actions.SIGN_UP:
            return action.payload 
        default:
            return state
    }
}

const rootReducer = combineReducers({
    followedEvents: followedEventsReducer,
    ownEvents: ownEventsReducer,
    followedUsers: followedUserReducer,
    allUsers: allUserReducer,
    currentUser: currentUserReducer
})

export default rootReducer
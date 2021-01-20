import { combineReducers } from 'redux'
import * as actions from './actionTypes'

const initialState = {
    followedEvents: [],
    allEvents: [],
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


function allEventsReducer(state = initialState.allEvents, action) {
    switch(action.type){
        case actions.GET_ALL_EVENTS:
            return action.payload
        case actions.ADD_EVENT:
            return [...state, action.payload]
        case actions.UPDATE_EVENT:
            let updatedArray = [...state]
            let indexOfUpdated = updatedArray.findIndex(event => event.id === action.payload.id)
            updatedArray[indexOfUpdated] = action.payload
            return updatedArray
        case actions.DELETE_EVENT:
            let newArray = [...state]
            let indexOfDeleted = newArray.findIndex(event => event.id === action.payload)
            newArray.splice(indexOfDeleted, 1)
            return newArray
        default:
            return state
    }
}

function followedUserReducer(state = initialState.followedUsers, action) {
    switch(action.type){
        case actions.GET_FOLLOWED_USERS:
            return action.payload
        case actions.ADD_FOLLOWER:
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
        case actions.LOG_OUT:
            return action.payload
        default:
            return state
    }
}

const rootReducer = combineReducers({
    followedEvents: followedEventsReducer,
    allEvents: allEventsReducer,
    followedUsers: followedUserReducer,
    allUsers: allUserReducer,
    currentUser: currentUserReducer
})

export default rootReducer
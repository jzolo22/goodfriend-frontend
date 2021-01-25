import { combineReducers } from 'redux'
import * as actions from './actionTypes'

const initialState = {
    followedEvents: [],
    allEvents: [],
    followedUsers: [],
    allUsers: [],
    currentUser: {},
    items: []
}

function followedEventsReducer(state = initialState.followedEvents, action) {
    switch(action.type){
        case actions.GET_FOLLOWED_EVENTS:
            console.log("in reducer", action.payload)
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
        case actions.UPDATE_USER:
            return action.payload
        case actions.SIGN_UP:
            return action.payload 
        case actions.LOG_OUT:
            return action.payload
        default:
            return state
    }
}

function itemsReducer(state = initialState.items, action) {
    switch(action.type) {
        case actions.ADD_ITEM:
            return [...state, action.payload]
        case actions.ALL_ITEMS:
            return action.payload
        case actions.DELETE_ITEM:
            let newArray = [...state]
            let index = newArray.findIndex(item => item.id === action.payload)
            newArray.splice(index, 1)
            return newArray
        case actions.UPDATE_ITEM:
            let updatedArray = [...state]
            let updatedIndex = updatedArray.findIndex(item => item.id === action.payload.id)
            updatedArray[updatedIndex] = action.payload
            return updatedArray
        default:
            return state
    }
}

const rootReducer = combineReducers({
    followedEvents: followedEventsReducer,
    allEvents: allEventsReducer,
    followedUsers: followedUserReducer,
    allUsers: allUserReducer,
    currentUser: currentUserReducer,
    items: itemsReducer
})



export default rootReducer
import { combineReducers } from 'redux'
import * as actions from './actionTypes'

const initialState = {
    followedEvents: [],
    followedUsers: []
}

function eventsReducer(state = initialState.followedEvents, action) {
    switch(action.type){
        case actions.GET_FOLLOWED_EVENTS:
            return action.payload
        default:
            return state
    }
}

function followedUserReducer(state = initialState.followedUsers, action) {
    switch(action.type){
        case actions.GET_FOLLOWED_USERS:
            return action.payload
        default:
            return state
    }
}

const rootReducer = combineReducers({
    followedEvents: eventsReducer,
    followedUsers: followedUserReducer
})

export default rootReducer
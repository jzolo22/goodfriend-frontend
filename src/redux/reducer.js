import { combineReducers } from 'redux'
import * as actions from './actionTypes'

const initialState = {
    events: []
}

function eventsReducer(state = initialState.events, action) {
    switch(action.type){
        case actions.GET_EVENTS:
            return action.payload
        default:
            return state
    }
}

const rootReducer = combineReducers({
    events: eventsReducer
})

export default rootReducer
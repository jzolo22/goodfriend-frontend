import { combineReducers } from 'redux'
import * as actions from './actionTypes'

const initialState = {
    events: []
}

function eventsReducer(state = initialState.events, action) {
    switch(action.type){
        default:
            return state
    }
}

const rootReducer = combineReducers({
    events: eventsReducer
})

export default rootReducer
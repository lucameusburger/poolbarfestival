import { combineReducers } from 'redux'

import { reducer as locationReducer, initialState as locationInitialState } from './locationReducer';


export const initialState = {
    location: locationInitialState,
}

export const rootReducer =
    combineReducers({
        location: locationReducer,
    })

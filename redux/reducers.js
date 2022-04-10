import { combineReducers } from 'redux'

import { reducer as artistsReducers, initialState as artistsInitialState } from './artistsReducer';

export const initialState = {
    artists: artistsInitialState
}

export const rootReducer =
    combineReducers({
        artists: artistsReducers
    })

import { combineReducers } from 'redux'

import { reducer as artistsReducers, initialState as artistsInitialState } from './artistsReducer';
import { reducer as eventsReducers, initialState as eventsInitialState } from './eventsReducer';
import { reducer as favoritesReducers, initialState as favoritesInitialState } from './favoritesReducer';

export const initialState = {
    artists: artistsInitialState,
    events: eventsInitialState,
    favorites: favoritesInitialState,
}

export const rootReducer =
    combineReducers({
        artists: artistsReducers,
        events: eventsReducers,
        favorites: favoritesReducers,
    })
import { combineReducers } from 'redux';

import { reducer as artistsReducers, initialState as artistsInitialState } from './artistsReducer';
import { reducer as eventsReducers, initialState as eventsInitialState } from './eventsReducer';
import { reducer as favoritesReducers, initialState as favoritesInitialState } from './favoritesReducer';
import { reducer as callenderReducer, initialState as callenderInitialState } from './callenderReducer';
import { reducer as venuesReducers, initialState as venuesInitialState } from './venueReducer';
import { reducer as spaceLocationsReducers, initialState as spaceLocationsInitialState } from './spaceLocationReducer';
import { reducer as generatorsReducers, initialState as generatorsInitialState } from './generatorsReducer';
import { reducer as locationReducers, initialState as locationInitialState } from './locationsReducer';
import { reducer as flowTextReducer, initialState as flowTextInitialState } from './flowTextReducer';

export const initialState = {
  artists: artistsInitialState,
  events: eventsInitialState,
  favorites: favoritesInitialState,
  callender: callenderInitialState,
  venues: venuesInitialState,
  generators: generatorsInitialState,
  locations: locationInitialState,
  flowText: flowTextInitialState,
};

export const rootReducer = combineReducers({
  artists: artistsReducers,
  events: eventsReducers,
  favorites: favoritesReducers,
  callender: callenderReducer,
  venues: venuesReducers,
  generators: generatorsReducers,
  locations: locationReducers,
  flowText: flowTextReducer,
});

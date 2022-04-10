import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { initialState, rootReducer } from './reducers'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: []
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
    persistedReducer,
    initialState,
);

const persistor = persistStore(store)

export { store, persistor }
import { configureStore } from '@reduxjs/toolkit';
import {  combineReducers } from "redux"
import characterSliceReducer from '../features/counter/character/CharcterSlice'
import storage from 'redux-persist/lib/storage'

import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  character: characterSliceReducer
})


const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore(
  {reducer: persistedReducer},
);

export let persistor = persistStore(store)
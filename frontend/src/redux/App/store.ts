import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../Features/api/apiSlice";
import userAuthReducer from '.././Features/reducers/userAuthSlice'
import adminAuthReducer from '../Features/reducers/adminAuthSlice'
import { persistReducer, persistStore, Persistor } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root', // Root key for the persisted state
    storage,
    version: 1
  };

  const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    userAuth: userAuthReducer,
    adminAuth: adminAuthReducer,
  });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer :persistedReducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,immutableCheck: false}).concat(apiSlice.middleware)
})
export const persistor: Persistor = persistStore(store);
export type State = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import appReducer from '../app/state_management/slice'

export const rootReducer = combineReducers({
  app: appReducer
})

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export default store

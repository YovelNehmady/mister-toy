import { combineReducers, legacy_createStore as createStore } from 'redux'
import { appReducer } from './app/app-reducer.js'

import { userReducer } from './user/user.reducer.js'
import { toyReducer } from './toy/toy.reducer.js'

// const { createStore, combineReducers } = Redux
const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()

const rootReducer = combineReducers({
    appModule: appReducer,
    toyModule: toyReducer,
    userModule: userReducer
})

export const store = createStore(rootReducer, middleware)
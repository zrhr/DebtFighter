import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import accountReducer from './accounts/reducer'

// import reducers...
const rootReducer = combineReducers({
    accounts: accountReducer
})

const middleware = [thunk]

export default createStore(rootReducer, applyMiddleware(...middleware))
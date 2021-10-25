import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import thunkMiddleware from "redux-thunk"
import { connectRouter, routerMiddleware } from "connected-react-router"
import { createBrowserHistory } from "history"
import messagesReducer from "./messages/messagesReducer";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const history = createBrowserHistory()

const rootReducer = combineReducers({
    messages: messagesReducer,
    router: connectRouter(history),
});


const middleware = [thunkMiddleware, routerMiddleware(history)]

const enhancers = composeEnhancers(applyMiddleware(...middleware))


export const store = createStore(rootReducer, enhancers)


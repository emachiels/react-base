import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "../reducers";

//The inital state Redux starts working with
const initialState = {};

//Middleware
const middleware = [thunk];

const composeEnhancers = (process.env.NODE_ENV && process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middleware)
    )
);

export default store;

import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import createHistory from 'history/createBrowserHistory';

import { routerMiddleware } from 'react-router-redux';

import rootReducer from './Reducer/Index';

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();

//build the middleware to accept and dispacthing navigation actions
const middleware = routerMiddleware(history);

//create an object for the data
const defaultState = {
    events : { post: [] , error: null, loading: false}
}

//Add the reducer to your store on the router key
//Also apply our middleware for navigation

const Store = createStore(rootReducer, defaultState, applyMiddleware(middleware, thunk));

export default Store;

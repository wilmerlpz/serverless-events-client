
import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';

import Posts from './Posts';

const rootReducer = combineReducers({ Posts, router: routerReducer});

export default rootReducer;
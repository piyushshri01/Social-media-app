import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import userReducers from './re'

const initialState = {};

const middleware = {thunk};



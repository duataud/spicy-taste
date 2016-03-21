import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './root-reducer';
import { Map } from 'immutable';

export default (initialState = Map()) => {
	const enhancer = applyMiddleware(thunk);
	const store = createStore(rootReducer, initialState, enhancer);
	return store;
};

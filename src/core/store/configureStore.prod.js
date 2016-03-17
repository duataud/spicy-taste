import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import reducer from '../reducer';

export default (initialState = {}) => {
	const enhancer = applyMiddleware(thunk);
	const store = createStore(reducer, initialState, enhancer);
	return store;
};

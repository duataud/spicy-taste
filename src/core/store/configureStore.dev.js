import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from '../reducer';

export default (initialState = {}) => {
	const logger = createLogger();
	const enhancer = compose(applyMiddleware(thunk, logger), window.devToolsExtension ? window.devToolsExtension() : f => f);
	const store = createStore(reducer, initialState, enhancer);

	if (module.hot) {
		module.hot.accept('./reducer', () => {
			store.replaceReducer(require('../reducer').default);
		});
	}

	return store;
};

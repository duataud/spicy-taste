import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Map, Iterable } from 'immutable';
import rootReducer from './root-reducer';

export default (initialState = Map()) => {
	const stateTransformer = (state) => {
		return Iterable.isIterable(state) ? state.toJS() : state;
	};
	const logger = createLogger({
		stateTransformer
	});
	const enhancer = compose(applyMiddleware(thunk, logger), window.devToolsExtension ? window.devToolsExtension() : f => f);
	const store = createStore(rootReducer, initialState, enhancer);

	if (module.hot) {
		module.hot.accept('./root-reducer', () => {
			store.replaceReducer(require('./root-reducer').default);
		});
	}

	return store;
};

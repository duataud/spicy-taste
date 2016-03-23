import { applyMiddleware } from 'redux';

const createStubStore = (state, middleware) => {
	function store() {
		return {
			dispatch() {},
			getState() {
				return typeof state === 'function' ? state() : state;
			}
		};
	}

	return applyMiddleware(...middleware)(store)();
};

export { createStubStore };

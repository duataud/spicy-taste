import { applyMiddleware } from 'redux';

export const createMockStore = (state, expetedActions, middleware, done) => {
	if (!Array.isArray(expetedActions)) {
		throw new Error('ERROR # createMockStore: `expetedActions` must be an array.');
	}

	if (typeof done !== 'undefined' && typeof done !== 'function') {
		throw new Error('ERROR # createMockStore: `done` must be undefined or a function');
	}

	const store = () => {
		return {
			dispatch(action) {
				const expectedAction = expetedActions.shift();
				try {
					if (typeof expectedAction === 'function') {
						expect(expectedAction(action)).toBe(true);
					} else {
						expect(action).toEqual(expectedAction);
					}

					if (done && !expetedActions.length) {
						done();
					}

					return action;
				} catch (error) {
					done(error);
				}
			},

			getState() {
				return typeof state === 'function' ? state() : state;
			}
		};
	};

	return applyMiddleware(...middleware)(store)();
};

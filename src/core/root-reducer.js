import { routerReducer, LOCATION_CHANGE } from 'react-router-redux';
import { Map } from 'immutable';

// Reducers

const reducers = (state = Map(), action) => {
	return Map({
		firebase: state.get('firebase')
	});
};

export default (state = Map(), action) => {
	if (action.type === LOCATION_CHANGE) {
		return state.set('routing', routerReducer(state.get('routing'), action));
	} else {
		return reducers(state, action);
	}
};

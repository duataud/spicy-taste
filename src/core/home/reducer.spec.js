import { fromJS } from 'immutable';

// import { LOAD_TOP_RECIPES_SUCCESS } from './action-types';
import { homeReducer } from './reducer';

describe('Home Reducer', () => {
	const initialState = fromJS({ isFetching: false, topRecipes: [] });

	it('should return initialState when action.type is not found', () => {
		expect(homeReducer(undefined, {})).toEqualImmutable(initialState);
	});
});

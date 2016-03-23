import { fromJS } from 'immutable';

import { LOAD_TOP_RECIPES_START, LOAD_TOP_RECIPES_SUCCESS, LOAD_TOP_RECIPES_ERROR } from './action-types';

const initialState = {
	isFetching: false,
	topRecipes: []
};

export const homeReducer = (state = fromJS(initialState), action) => {
	switch (action.type) {
		case LOAD_TOP_RECIPES_START:
			return state.set('isFetching', true);
		case LOAD_TOP_RECIPES_SUCCESS:
			return state.merge({ isFetching: false, topRecipes: action.payload });
		case LOAD_TOP_RECIPES_ERROR:
			return state.set('isFetching', false);
		default:
			return state;
	}
};

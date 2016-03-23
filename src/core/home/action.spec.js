import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import _ from 'lodash';
import { createMockStore } from 'test/utils';

import { LOAD_TOP_RECIPES_SUCCESS } from './action-types';
import { loadTopRecipes } from './actions';

/**
 * Mockfirebase doesn't support limitToLast() query
 */
describe('Home Actions', () => {
	// describe('loadTopRecipes', () => {
	// 	it('should get 3 recipes', (done) => {
	// 		const firebase = new MockFirebase();
	// 		var ref = firebase.child('recipes');
	// 		const expectedActions = [(action) => {
	// 			return action.type === LOAD_TOP_RECIPES_SUCCESS &&
	// 				action.payload.size === 3;
	// 		}];

	// 		const store = createMockStore(fromJS({
	// 			firebase: firebase
	// 		}), expectedActions, [thunk], done);

	// 		store.dispatch(loadTopRecipes());
	// 		_.times(3, () => {
	// 			ref.push({ name: _.uniqueId('recipe_') });
	// 		});
	// 		ref.flush();
	// 	});
	// });
});

import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import _ from 'lodash';
import { createMockStore } from 'test/utils';

import { CREATE_RECIPE_SUCCESS } from './action-types';
import { createRecipe, registerReadListener } from './actions';

describe('Recipes Actions', () => {
	describe('createRecipe', () => {
		let sampleRecipe = {
			name: 'recipe 1',
			uid: '123',
			prepTime: 1,
			totalTime: 2,
			cookTime: 1,
			blog: 'sample blog'
		};

		it('should create CREATE_RECIPE_SUCCESS', (done) => {
			const expectedActions = [(action) => {
				let record = _.omit(action.payload, ['key']);
				return action.type === CREATE_RECIPE_SUCCESS &&
					_.isEqual(record, sampleRecipe);
			}];

			const firebase = new MockFirebase();

			const store = createMockStore({
				firebase: firebase,
				recipes: fromJS([])
			}, expectedActions, [thunk], done);

			store.dispatch(registerReadListener());
			store.dispatch(createRecipe(sampleRecipe));

			firebase.flush();
		});
	});
});

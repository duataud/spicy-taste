import {
	CREATE_RECIPE_ERROR,
	CREATE_RECIPE_SUCCESS,
	UPDATE_RECIPE_ERROR,
	UPDATE_RECIPE_SUCCESS
} from './action-types';

import { recordFromSnapshot, consoleError } from '../utils';

export const createRecipe = (recipe) => {
	return (dispatch, getState) => {
		const firebase = getState().get('firebase');

		firebase.child('recipes').push(recipe, error => {
			if (error) {
				consoleError('createRecipe', error);
				dispatch({
					type: CREATE_RECIPE_ERROR,
					payload: error
				});
			}
		});
	};
};

export const updateRecipe = (key, updatedRecipe) => {
	return (dispatch, getState) => {
		const firebase = getState().get('firebase');

		firebase.child(`recipes/${key}`).update(updatedRecipe, error => {
			if (error) {
				consoleError('updateRecipe', error);
				dispatch({
					type: UPDATE_RECIPE_ERROR,
					payload: error
				});
			}
		});
	};
};


export const registerReadListener = () => {
	return (dispatch, getState) => {
		const firebase = getState().get('firebase');
		const ref = firebase.child('recipes');

		ref.on('child_added', snapshot => dispatch({
			type: CREATE_RECIPE_SUCCESS,
			payload: recordFromSnapshot(snapshot)
		}));
	};
};

export const registerUpdateListener = () => {
	return (dispatch, getState) => {
		const firebase = getState().get('firebase');
		const ref = firebase.child('recipes');

		ref.on('child_changed', snapshot => dispatch({
			type: UPDATE_RECIPE_SUCCESS,
			payload: recordFromSnapshot(snapshot)
		}));
	};
};

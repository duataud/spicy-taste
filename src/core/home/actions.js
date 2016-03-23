import { LOAD_TOP_RECIPES_START, LOAD_TOP_RECIPES_SUCCESS, LOAD_TOP_RECIPES_ERROR } from './action-types';
import { List } from 'immutable';
import { recordFromSnapshot } from '../utils';

const loadStart = () => {
	return {
		type: LOAD_TOP_RECIPES_START
	};
};

const loadSuccess = (snapshot) => {
	let listOfRecipes = List();
	snapshot.forEach((item, index) => {
		let record = recordFromSnapshot(item);
		listOfRecipes = listOfRecipes.insert(index, record);
	});
	return {
		type: LOAD_TOP_RECIPES_SUCCESS,
		payload: listOfRecipes
	};
};

const loadError = (error) => {
	return {
		type: LOAD_TOP_RECIPES_ERROR,
		error: error
	};
};

export const loadTopRecipes = () => {
	return (dispatch, getState) => {
		dispatch(loadStart());

		const firebase = getState().get('firebase');
		const ref = firebase.child('recipes');
		ref.limitToLast(10).once('value', snapshot => {
			dispatch(loadSuccess(snapshot));
		}, error => {
			dispatch(loadError(error));
		});
	};
};

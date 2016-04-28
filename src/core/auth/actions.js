import { INIT_AUTH, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS } from './action-types';

import { consoleError } from '../utils';

const signInSuccess = (authData) => {
	return {
		type: SIGN_IN_SUCCESS,
		payload: authData,
		meta: {
			timestamp: Date.now()
		}
	};
};

const saveNewUser = (authData) => {
	return (dispatch, getState) =>{
		const firebase = getState().get('firebase');
		const userRef = firebase.child(`users/${authData.uid}`);
		return userRef.once('value').then((snapshot) => {
			if (!snapshot.exists()) {
				userRef.set(getUserInfo(authData));
			}
		});
	};
};

export const getUserInfo = (authData) =>{
	let userInfo = {
		uid: authData.uid
	};

	switch (authData.provider) {
		case 'password':
			userInfo.name = authData.password.email.replace(/@.*/, '');
			userInfo.profileImageURL = authData.password.profileImageURL;
			break;
		case 'facebook':
			userInfo.name = authData.facebook.displayName;
			userInfo.profileImageURL = authData.facebook.profileImageURL;
			break;
		default:
	}
	return userInfo;
};

const authenticatWithProvider = (provider) => {
	return (dispatch, getState) => {
		const firebase = getState().get('firebase');

		firebase.authWithOAuthPopup(provider, (error, authData) => {
			if (error) {
				consoleError('authWithOAuthPopup', error);
			} else {
				dispatch(signInSuccess(authData));
				dispatch(saveNewUser(authData));
			}
		});
	};
};

const authenticateWithPassword = (email, password) => {
	return (dispatch, getState) => {
		const firebase = getState().get('firebase');

		return firebase.authWithPassword({ email, password })
			.then((authData) => authData);
	};
};

export const initAuth = () => {
	return (dispatch, getState) => {
		const firebase = getState().get('firebase');
		dispatch({
			type: INIT_AUTH,
			payload: firebase.getAuth(),
			meta: {
				timestamp: Date.now()
			}
		});
	};
};

export const signInWithPassword = (email, password) => {
	return (dispatch, getState) => {
		const firebase = getState().get('firebase');

		return firebase.createUser({ email, password })
			.catch(
				(error) => {
					switch (error.code) {
						case 'EMAIL_TAKEN':
							return Promise.resolve();
						default:
							return Promise.reject(error);
					}
				}
			)
			.then(
				() => dispatch(authenticateWithPassword(email, password))
			)
			.then(
				(authData) => {
					dispatch(signInSuccess(authData));
					dispatch(saveNewUser(authData));
				}
			)
			.catch((error) => consoleError('signInWithPassword', error));
	};
};

export const signInWithFacebook = () => {
	return authenticatWithProvider('facebook');
};

export const signOut = () => {
	return (dispatch, getState) => {
		const firebase = getState().get('firebase');
		firebase.unauth();
		dispatch({
			type: SIGN_OUT_SUCCESS
		});
	};
};

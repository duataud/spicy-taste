import {INIT_AUTH, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS} from './action-types';
import {getUserInfo} from './actions';
import {fromJS} from 'immutable';

export const initialState = fromJS({
	isAuthenticated: false,
	userInfo: null
});

export const authReducer = (state = initialState, action) =>{
	const {meta, payload} = action;

	switch (action.type) {
		case INIT_AUTH:
			let isAuthenticated = payload !== null && (payload.expires * 1000) > meta.timestamp;
			return fromJS({
				isAuthenticated,
				userInfo: isAuthenticated ? getUserInfo(payload) : null
			});
		case SIGN_IN_SUCCESS:
			return fromJS({
				isAuthenticated: true,
				userInfo: getUserInfo(payload)
			});
		case SIGN_OUT_SUCCESS:
			return initialState;
		default:
			return state;
	}
};

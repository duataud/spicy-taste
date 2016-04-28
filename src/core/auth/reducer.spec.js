import moment from 'moment';
import {fromJS} from 'immutable';

import {INIT_AUTH, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS} from './action-types';

import { authReducer, initialState} from './reducer';

describe('Auth Reducer', ()=>{
	const future = ()=> moment().add(1, 'd').unix();

	const past = () => moment().subtract(1, 'd').unix();

	const present = () => Date.now();

	it('should return the initial state when action.type is not found', ()=>{
		expect(authReducer(undefined, fromJS({}))).toEqual(initialState);
	});

	describe('INIT_AUTH', ()=>{
		it('should return state as `isAuthenticated` if token has NOT expired', () =>{
			let state = authReducer(initialState, {
				type: INIT_AUTH,
				payload: {
					provider: 'password',
					expires: future(),
					uid: '123',
					password: {email: 'test@gmail.com', profileImageURL: 'http://gravatar.com/image'}
				},
				meta: {timestamp: present()}
			});

			expect(state).toEqualImmutable(fromJS({
				isAuthenticated: true,
				userInfo: {
					name: 'test',
					uid: '123',
					profileImageURL: 'http://gravatar.com/image'
				}
			}));
		});

		it('should return state as `isNOTAuthenticated` if token has expired', () =>{
			let state = authReducer(initialState, {
				type: INIT_AUTH,
				payload: {
					expires: past()
				},
				meta: {timestamp: present()}
			});

			expect(state).toEqualImmutable(initialState);
		});

		it('should return state as `isNOTAuthenticated` if `authData` is null', () =>{
			let state = authReducer(initialState, {
				type: INIT_AUTH,
				payload: null,
				meta: {timestamp: present()}
			});
			expect(state).toEqualImmutable(initialState);
		});
	});

	describe('SIGN_IN_SUCCESS', ()=>{
		it('should return state as `isAuthenticated`', ()=>{
			let state = authReducer(initialState, {
				type: SIGN_IN_SUCCESS,
				payload: {
					provider: 'password',
					expires: future(),
					uid: '123',
					password: {email: 'test@gmail.com', profileImageURL: 'http://gravatar.com/image'}
				},
				meta: {timestamp: present()}
			});

			expect(state).toEqualImmutable(fromJS({
				isAuthenticated: true,
				userInfo: {
					name: 'test',
					uid: '123',
					profileImageURL: 'http://gravatar.com/image'
				}
			}));
		});
	});

	describe('SIGN_OUT_SUCCESS', ()=>{
		it('should return state as `isNOTAuthenticated`', ()=>{
			let state = authReducer(initialState, {
				type: SIGN_OUT_SUCCESS,
				payload: null,
				meta: {timestamp: present()}
			});

			expect(state).toEqualImmutable(initialState);
		});
	});
});

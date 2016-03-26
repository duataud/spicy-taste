import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import sinonStubPromise from 'sinon-stub-promise';
sinonStubPromise(sinon);

import { createMockStore, createStubStore } from 'test/utils';
import { INIT_AUTH, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS } from './action-types';
import { initAuth, signInWithFacebook, signInWithPassword, signOut } from './actions';

describe('Auth Actions', () => {
	describe('initAuth', () => {
		it('should create INIT_AUTH when authenticated', (done) => {
			const authData = { uid: '123' };
			const firebase = new MockFirebase();

			const expectedActions = [(action) => {
				return action.type === INIT_AUTH &&
					action.payload === authData &&
					typeof action.meta.timestamp === 'number';
			}];

			const store = createMockStore(fromJS({ firebase }), expectedActions, [thunk], done);

			firebase.changeAuthState(authData);
			firebase.flush();

			store.dispatch(initAuth());
		});

		it('should create INIT_AUTH when NOT authenticated', (done) => {
			const firebase = new MockFirebase();

			const expectedActions = [(action) => {
				return action.type === INIT_AUTH &&
					action.payload === null &&
					typeof action.meta.timestamp === 'number';
			}];

			const store = createMockStore(fromJS({ firebase }), expectedActions, [thunk], done);

			store.dispatch(initAuth());
		});
	});

	describe('signInWithPassword', () => {

		it('should invoke Firebase#createUser() with param `email` and `password`', () => {
			const email = 'test@gmail.com';
			const password = 'password';
			const firebase = new MockFirebase();

			let p1 = sinon.stub(firebase, 'createUser').returnsPromise();
			sinon.stub(firebase, 'authWithPassword').returnsPromise();
			const store = createStubStore(fromJS({ firebase }), [thunk]);

			p1.resolves();

			store.dispatch(signInWithPassword(email, password));
			expect(firebase.createUser.calledWith({ email, password })).toBe(true);
			expect(firebase.authWithPassword.calledWith({ email, password })).toBe(true);
		});

		it('should create SIGN_IN_SUCCESS', (done) => {
			const authData = {
				uid: '123'
			};
			const email = 'test@gmail.com';
			const password = 'password';
			const firebase = new MockFirebase();
			const expectedActions = [(action) => {
				return action.type === SIGN_IN_SUCCESS &&
					action.payload.uid === authData.uid &&
					typeof action.meta.timestamp === 'number';
			}];

			let p1 = sinon.stub(firebase, 'createUser').returnsPromise();
			let p2 = sinon.stub(firebase, 'authWithPassword').returnsPromise();

			p1.resolves();
			p2.resolves();

			const store = createMockStore(fromJS({ firebase }), expectedActions, [thunk], done);

			// call with params to change auth state to `authenticated`
			firebase.changeAuthState(authData);
			store.dispatch(signInWithPassword(email, password));
			firebase.flush();
		});
	});

	describe('signInWithFacebook', () => {
		it('should invoke Firebase#authWithOAuthPopup() with param `facebook`', () => {
			const firebase = new MockFirebase();
			sinon.stub(firebase, 'authWithOAuthPopup');
			const store = createStubStore(fromJS({ firebase }), [thunk]);

			store.dispatch(signInWithFacebook());
			expect(firebase.authWithOAuthPopup.calledWith('facebook')).toBe(true);
		});

		it('should create SIGN_IN_SUCCESS', (done) => {
			const authData = { uid: '123' };
			const firebase = new MockFirebase();

			const expectedActions = [(action) => {
				return action.type === SIGN_IN_SUCCESS &&
					action.payload.uid === authData.uid &&
					typeof action.meta.timestamp === 'number';
			}];

			const store = createMockStore(fromJS({ firebase }), expectedActions, [thunk], done);

			firebase.changeAuthState(authData);
			store.dispatch(signInWithFacebook());
			firebase.flush();
		});
	});

	describe('signOut', () => {
		it('should call Firebase#unauth', () => {
			const firebase = new MockFirebase();
			sinon.stub(firebase, 'unauth');
			const store = createStubStore(fromJS({ firebase }), [thunk]);

			store.dispatch(signOut());
			expect(firebase.unauth.callCount).toBe(1);
		});

		it('should create SIGN_OUT_SUCCESS', (done) => {
			const firebase = new MockFirebase();
			const expectedActions = [{ type: SIGN_OUT_SUCCESS }];

			const store = createMockStore(fromJS({ firebase }), expectedActions, [thunk], done);

			store.dispatch(signOut());
			firebase.flush();
		});
	});
});

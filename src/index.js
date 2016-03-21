import React from 'react';
import ReactDOM from 'react-dom';
import Firebase from 'firebase';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { fromJS } from 'immutable';

import { Root } from 'components/root';
import configureStore from 'core/configureStore';
import { FIREBASE_URL } from './config';

const store = configureStore(fromJS({
	firebase: new Firebase(FIREBASE_URL)
}));

const selectLocationState = state => state.get('routing') || {};

const history = syncHistoryWithStore(browserHistory, store, { selectLocationState });

ReactDOM.render((
	<Root history={history} store={store}/>
), document.querySelector('.app-root'));

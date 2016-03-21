import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Route, Router, IndexRoute } from 'react-router';

// Components
import App from './app/App';
import About from './app/About';

import Home from './home/Home';
import Recipes from './recipes/Recipes';
import Recipe from './recipes/Recipe';

export class Root extends Component {
	static propTypes = {
		history: PropTypes.object.isRequired,
		store: PropTypes.object.isRequired
	};

	render() {
		const { history, store } = this.props;

		return (
			<Provider store={store}>
				<Router history={history}>
					<Route component={App} path="/">
						<IndexRoute component={Home}/>
						<Route component={Recipes} path="/recipes"/>
						<Route path="/recipes/:key" component={Recipe}/>
						<Route component={About} path="/about"/>
					</Route>
				</Router>
			</Provider>
		);
	}
}

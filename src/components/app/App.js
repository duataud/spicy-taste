import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Componnets
import NavLink from './NavLink';


export class App extends Component {
	static propTypes = {
		children: PropTypes.object.isRequired
	};

	render() {
		const { children } = this.props;
		return (
			<div>
				<header>
					<h1>Spicy Taste</h1>
					<ul>
						<li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
						<li><NavLink to="/recipes">Recipes</NavLink></li>
						<li><NavLink to="/about">About</NavLink></li>
					</ul>
				</header>
				<main>{children}</main>
			</div>
		);
	}
}

export default connect(state => state.toJS())(App);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavLink from '../app/NavLink';

export class Recipes extends Component {

	render() {
		return (
			<div>
				<h2>Recipes page</h2>
				<ul>
					<li><NavLink to="recipes/samplerecipe1">samplerecipe1</NavLink></li>
					<li><NavLink to="recipes/samplerecipe2">samplerecipe2</NavLink></li>
				</ul>
			</div>
		);
	}
}

export default connect(state => state.toJS())(Recipes);

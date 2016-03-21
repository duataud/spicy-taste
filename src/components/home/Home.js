import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export class Home extends Component {

	render() {
		return (
			<div>
				<h2>Home page</h2>
			</div>
		);
	}
}

export default connect(state => state.toJS())(Home);

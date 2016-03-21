import React, { Component, PropTypes } from 'react';

export default class Recipe extends Component {
	static propTypes = {
		params: PropTypes.object.isRequired
	};

	render() {
		const { key } = this.props.params;

		return (
			<div>
				<h2>Recipe Detail</h2>
				<p> Key: {key} </p>
			</div>
		);
	}
}

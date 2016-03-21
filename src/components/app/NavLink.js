import { Link } from 'react-router';
import React, { Component } from 'react';

export default class NavLink extends Component {
	render() {
		return <Link {...this.props} activeClassName="active"/>;
	}
}

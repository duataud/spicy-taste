import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { homeActions } from 'core/home';
import { List } from 'immutable';

export class Home extends Component {
	static propTypes = {
		isFetching: PropTypes.bool.isRequired,
		loadTopRecipes: PropTypes.func.isRequired,
		topRecipes: PropTypes.instanceOf(List).isRequired
	};

	componentDidMount() {
		if (this.props.topRecipes.size === 0) {
			this.props.loadTopRecipes();
		}
	}

	renderRecipeItem(topRecipes) {
		return topRecipes.map((recipe, index) => {
			return (
				<p key={index}>{index}: {recipe.name}</p>
			);
		});
	}

	render() {
		const { isFetching, topRecipes } = this.props;
		return (
			<div>
				<h2>Home page</h2>
				{isFetching ? <p>Loading...</p> : this.renderRecipeItem(topRecipes)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isFetching: state.getIn(['home', 'isFetching']),
		topRecipes: state.getIn(['home', 'topRecipes'])
	};
};

export default connect(mapStateToProps, {...homeActions })(Home);

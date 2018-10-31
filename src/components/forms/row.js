import React, { Component } from 'react';

export default class Row extends Component {
	render() {
		const children = React.Children.map(
			this.props.children,
			children => {
				return children;
			}
		);

		return (
			<div className="forminator-row">
				{ children }
			</div>
		);
	}
}

import React, { Component } from 'react';

export default class Col extends Component {
	render() {
		const children = React.Children.map(
			this.props.children,
			children => {
				return children;
			}
		);

		const hiddenCol = this.props.hiddenCol
			? 'forminator-col forminator-hidden'
			: 'forminator-col'
			;

		return (
			<div className={ hiddenCol }>
				{ children }
			</div>
		);
	}
}

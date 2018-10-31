import React, { Component } from 'react';

export default class Form extends Component {
	render() {
		const children = React.Children.map(
			this.props.children,
			children => {
				return children;
			}
		);

		const enclosed = this.props.enclosed
			? ' forminator-enclosed'
			: ''
			;

		return (
			<form className={ `forminator-custom-form${ enclosed }` }>
				{ children }
			</form>
		);
	}
}

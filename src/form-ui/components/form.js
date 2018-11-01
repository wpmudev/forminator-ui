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

		const design = this.props.design
			? ' forminator-design--' + this.props.design
			: ' forminator-design--default'
			;

		const fieldId = this.props.property
			? 'forminator-module-' + this.props.property
			: 'forminator-module'
			;

		return (
			<form id={ fieldId }
				className={ `forminator-custom-form${ enclosed }${ design }` }>
				{ children }
			</form>
		);
	}
}

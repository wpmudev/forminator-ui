import React, { Component } from 'react';

export default class Title extends Component {
	render() {
		let label = '';

		if ( this.props.label ) {
			label = (
				<h1>{ this.props.label }</h1>
			);
		}

		return label;

	}
}

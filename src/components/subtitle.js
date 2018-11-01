import React, { Component } from 'react';

export default class Subtitle extends Component {
	render() {
		let label = '';

		if ( this.props.label ) {
			label = (
				<p>{ this.props.label }</p>
			);
		}

		return label;

	}
}

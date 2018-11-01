import React, { Component } from 'react';

import Title from '../components/title';
import Subtitle from '../components/subtitle';

export default class Header extends Component {
	render() {
		let title = '';
		let subtitle = '';

		if ( this.props.title ) {
			title = (
				<Title label={ this.props.title } />
			);
		}

		if ( this.props.subtitle ) {
			subtitle = (
				<Subtitle label={ this.props.subtitle } />
			);
		}

		return (
			<header>
				{ title }
				{ subtitle }
			</header>
		);

	}
}

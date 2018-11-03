import React, { Component } from 'react';

import SectionSample from '../samples/section';
import InputSample from '../samples/input';
import TextareaSample from '../samples/textarea';

export default class Select extends Component {
	constructor() {
		super();

		this.state = {
			hover: false
		};

		this.onHover = this.onHover.bind( this );
	}

	onHover() {
		this.setState({
			hover: !this.state.hover
		});
	}

	render() {
		return (
			<React.Fragment>

				<SectionSample design="material"
					label="Section Element"
					description="This element will allow you to add an underlined title and subtitle to your form." />

				<InputSample design="material"
					label="Input Element"
					description="This element style is used for several form fields, like: input, name, email, number, etc." />

				<TextareaSample design="material"
					label="Textarea Element" />

			</React.Fragment>
		);
	}
}

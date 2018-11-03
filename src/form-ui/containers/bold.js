import React, { Component } from 'react';

import SectionSample from '../samples/section';
import InputSample from '../samples/input';
import TextareaSample from '../samples/textarea';

export default class Bold extends Component {
	render() {
		return (
			<React.Fragment>

				<SectionSample design="bold"
					label="Section Element"
					description="This element will allow you to add an underlined title and subtitle to your form." />

				<InputSample design="bold"
					label="Input Element"
					description="This element style is used for several form fields, like: input, name, email, number, etc." />

				<TextareaSample design="bold"
					label="Textarea Element" />

			</React.Fragment>
		);
	}
}

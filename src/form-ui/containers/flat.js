import React, { Component } from 'react';

import SectionSample from '../samples/section';
import InputSample from '../samples/input';
import TextareaSample from '../samples/textarea';

export default class Flat extends Component {
	render() {
		return (
			<React.Fragment>

				<SectionSample design="flat"
					label="Section Element"
					description="This element will allow you to add an underlined title and subtitle to your form." />

				<InputSample design="flat"
					label="Input Element"
					description="This element style is used for several form fields, like: input, name, email, number, etc." />

				<TextareaSample design="flat"
					label="Textarea Element" />

			</React.Fragment>
		);
	}
}

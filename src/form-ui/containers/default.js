import React, { Component } from 'react';

import SectionSample from '../samples/section';
import InputSample from '../samples/input';
import TextareaSample from '../samples/textarea';
import Select from '../samples/select';

export default class Default extends Component {
	render() {
		return (
			<React.Fragment>

				<SectionSample design="default"
					label="Section Element"
					description="This element will allow you to add an underlined title and subtitle to your form." />

				<InputSample design="default"
					label="Input Element"
					description="This element style is used for several form fields, like: input, name, email, number, etc." />

				<TextareaSample design="default"
					label="Textarea Element" />

				<Select design="default"
					label="Select" />

			</React.Fragment>
		);
	}
}

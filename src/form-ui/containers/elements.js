import React, { Component } from 'react';

import InputSample from '../samples/input';
import TextareaSample from '../samples/textarea';

export default class Elements extends Component {
	render() {
		return (
			<React.Fragment>

				<InputSample design="default"
					label="Input Element"
					description="This element style is used for several form fields, like: input, name, email, number, etc." />

				<TextareaSample design="default"
					label="Textarea Element" />

			</React.Fragment>
		);
	}
}

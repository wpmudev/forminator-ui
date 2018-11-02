import React, { Component } from 'react';

import InputSample from '../samples/input';
import TextareaSample from '../samples/textarea';

export default class Elements extends Component {
	render() {
		return (
			<React.Fragment>

				<InputSample />
				<TextareaSample />

			</React.Fragment>
		);
	}
}

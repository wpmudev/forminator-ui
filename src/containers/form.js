import React, { Component } from 'react';

import Form from '../components/forms/form';
import Row from '../components/forms/row';
import Grid from '../components/forms/sample-grid';
import Input from '../components/forms/input';
import Section from '../components/forms/section';

export default class PageForm extends Component {
	render() {
		return(
			<React.Fragment>
				<h2>Default</h2>
				<Grid />
				<hr />
				<h2>Enclosed</h2>
				<Grid enclosed />
				<hr />
				<h2>Form Fields</h2>
				<Form>
					<Row>
						<Input type="email"
							label="Email Address"
							placeholder="E.g. john@doe.com" />
					</Row>
					<Row>
						<Input label="Phone Number"
							placeholder="E.g. +1 300 400 5000" />
					</Row>
					<Row>
						<Input label="Input Text" />
					</Row>
					<Row>
						<Input type="number"
							label="Number"
							placeholder="E.g. 10" />
					</Row>
					<Row>
						<Section title="Form Section"
							subtitle="This is a form section description"
							hasBorder />
					</Row>
				</Form>
			</React.Fragment>
		);
	}
}

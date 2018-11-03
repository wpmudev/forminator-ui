import React, { Component } from 'react';

import Form from '../../components/form';
import Row from '../../components/row';
import Input from '../../components/input';

export default class InputSample extends Component {
	render() {
		return (
			<React.Fragment>

				<div className="block">

					<div className="block-side">
						<span className="block-label dark">Input</span>
						<span className="description">This element style is used for several form fields, like: input, name, email, number, etc.</span>
					</div>

					<div className="block-content">

						<Form design="default">
							<Row>
								<Input property="input-default"
									label="Field label"
									placeholder="Placeholder"
									description="Description for input field." />
							</Row>
							<Row>
								<Input property="input-required-default"
									label="Required field"
									placeholder="Placeholder"
									description="Description for input field."
									isRequired
									hasError />
							</Row>
						</Form>

					</div>

				</div>

			</React.Fragment>
		);
	}
}

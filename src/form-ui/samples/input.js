import React, { Component } from 'react';

import Options from '../../components/options';

import Form from '../components/form';
import Row from '../components/row';
import Input from '../components/input';

export default class InputSample extends Component {
	render() {
		return (
			<React.Fragment>

				<h2>Input</h2>

				<Options default="default">

					<Form design="default"
						value="default"
						label="Default">
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

					<Form design="flat"
						value="flat"
						label="Flat">
						<Row>
							<Input property="input-flat"
								label="Field label"
								placeholder="Placeholder"
								description="Description for input field." />
						</Row>
						<Row>
							<Input property="input-required-flat"
								label="Required field"
								placeholder="Placeholder"
								description="Description for input field."
								isRequired
								hasError />
						</Row>
					</Form>

					<Form design="bold"
						value="bold"
						label="Bold">
						<Row>
							<Input property="input-bold"
								label="Field label"
								placeholder="Placeholder"
								description="Description for input field." />
						</Row>
						<Row>
							<Input property="input-required-bold"
								label="Required field"
								placeholder="Placeholder"
								description="Description for input field."
								isRequired
								hasError />
						</Row>
					</Form>

					<Form design="material"
						value="material"
						label="Material">
						<Row>
							<Input property="input-material"
								label="Field label"
								placeholder="Placeholder"
								description="Description for input field."
								isMaterial />
						</Row>
						<Row>
							<Input property="input-required-material"
								label="Required field"
								placeholder="Placeholder"
								description="Description for input field."
								isMaterial
								isRequired
								hasError />
						</Row>
					</Form>

					<Form design="none"
						value="none"
						label="None">
						<Row>
							<Input property="input-none"
								label="Field label"
								placeholder="Placeholder"
								description="Description for input field." />
						</Row>
						<Row>
							<Input property="input-required-none"
								label="Required field"
								placeholder="Placeholder"
								description="Description for input field."
								isRequired
								hasError />
						</Row>
					</Form>

				</Options>

			</React.Fragment>
		);
	}
}

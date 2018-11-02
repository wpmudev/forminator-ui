import React, { Component } from 'react';

import Options from '../../components/options';

import Form from '../components/form';
import Row from '../components/row';
import Textarea from '../components/textarea';

export default class TextareaSample extends Component {
	render() {
		return (
			<React.Fragment>

				<h2>Textarea</h2>

				<Options default="default">

					<Form design="default"
						value="default"
						label="Default">
						<Row>
							<Textarea property="textarea-default"
								label="Field label"
								placeholder="Placeholder"
								description="Description for textarea field." />
						</Row>
						<Row>
							<Textarea property="textarea-required-default"
								label="Required field"
								placeholder="Placeholder"
								description="Description for textarea field."
								isRequired
								hasError />
						</Row>
					</Form>

					<Form design="flat"
						value="flat"
						label="Flat">
						<Row>
							<Textarea property="textarea-flat"
								label="Field label"
								placeholder="Placeholder"
								description="Description for textarea field." />
						</Row>
						<Row>
							<Textarea property="textarea-required-flat"
								label="Required field"
								placeholder="Placeholder"
								description="Description for textarea field."
								isRequired
								hasError />
						</Row>
					</Form>

					<Form design="bold"
						value="bold"
						label="Bold">
						<Row>
							<Textarea property="textarea-bold"
								label="Field label"
								placeholder="Placeholder"
								description="Description for textarea field." />
						</Row>
						<Row>
							<Textarea property="textarea-required-bold"
								label="Required field"
								placeholder="Placeholder"
								description="Description for textarea field."
								isRequired
								hasError />
						</Row>
					</Form>

					<Form design="material"
						value="material"
						label="Material">
						<Row>
							<Textarea property="textarea-material"
								label="Field label"
								placeholder="Placeholder"
								description="Description for textarea field."
								isMaterial />
						</Row>
						<Row>
							<Textarea property="textarea-required-material"
								label="Required field"
								placeholder="Placeholder"
								description="Description for textarea field."
								isMaterial
								isRequired
								hasError />
						</Row>
					</Form>

					<Form design="none"
						value="none"
						label="None">
						<Row>
							<Textarea property="textarea-none"
								label="Field label"
								placeholder="Placeholder"
								description="Description for textarea field." />
						</Row>
						<Row>
							<Textarea property="textarea-required-none"
								label="Required field"
								placeholder="Placeholder"
								description="Description for textarea field."
								isRequired
								hasError />
						</Row>
					</Form>

				</Options>

			</React.Fragment>
		);
	}
}
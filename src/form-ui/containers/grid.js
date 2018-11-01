import React, { Component } from 'react';

import Options from '../../components/options';

import Form from '../components/form';
import Row from '../components/row';
import Col from '../components/col';

export default class Grid extends Component {
	render() {
		return (
			<React.Fragment>

				<p>Form elements can be placed in a maximum of 4 columns per row and the spacing for the grid comes in three variations: comfortable, compact and custom.</p>

				<Options default="default">
					<div label="Comfortable"
						value="default">
						<span className="description">Comfortable spacing will add 30px distance between columns.</span>
					</div>
					<div label="Compact"
						value="enclosed">
						<span className="description">Compact spacing will add 20px distance between columns.</span>
					</div>
					<div label="Custom"
						value="custom">
						<span className="description">Custom will allow users to add the desired distance between columns.</span>
					</div>
				</Options>

				<Form property="1">

					<Row>
						<Col>
							<div className="sample-column">Field</div>
						</Col>
					</Row>

					<Row>
						<Col>
							<div className="sample-column">Field</div>
						</Col>
						<Col>
							<div className="sample-column">Field</div>
						</Col>
					</Row>

					<Row>
						<Col>
							<div className="sample-column">Field</div>
						</Col>
						<Col>
							<div className="sample-column">Field</div>
						</Col>
						<Col>
							<div className="sample-column">Field</div>
						</Col>
					</Row>

					<Row>
						<Col>
							<div className="sample-column">Field</div>
						</Col>
						<Col>
							<div className="sample-column">Field</div>
						</Col>
						<Col>
							<div className="sample-column">Field</div>
						</Col>
						<Col>
							<div className="sample-column">Field</div>
						</Col>
					</Row>

				</Form>

			</React.Fragment>
		);
	}
}

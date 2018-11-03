import React, { Component } from 'react';

import Form from '../components/form';
import Row from '../components/row';
import Input from '../components/input';

export default class InputSample extends Component {
	render() {
		const design = this.props.design
			? this.props.design
			: 'default'
			;

		let label = '';

		if ( this.props.label ) {
			label = (
				<span className="block-label dark">
					{ this.props.label }
				</span>
			);
		}

		let description = '';

		if ( this.props.description ) {
			description = (
				<span className="description">
					{ this.props.description }
				</span>
			);
		}

		let blockSide = '';

		if ( this.props.label || this.props.description ) {

			blockSide = (
				<div className="block-side">
					{ label }
					{ description }
				</div>
			);
		}

		return (
			<React.Fragment>

				<div className="block">

					{ blockSide }

					<div className="block-content">

						<Form design={ design }>
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

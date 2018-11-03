import React, { Component } from 'react';

import Form from '../components/form';
import Row from '../components/row';
import Select from '../components/select';

export default class SelectSample extends Component {
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
								<Select design={ design }
									property={ `select-${ design }` }
									label="Field label"
									description="Description for select field." />
							</Row>
						</Form>

					</div>

				</div>

			</React.Fragment>
		);
	}
}

import React, { Component } from 'react';

import Row from './row';
import Col from './col';

export default class Grid extends Component {
	render() {
		const enclosed = this.props.enclosed
			? ' forminator-enclosed'
			: ''
			;

		return(
			<div className={ `forminator-custom-form${ enclosed }` }>
				<Row>
					<Col>
						<div className="sample-block">Column 1</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<div className="sample-block">Column 1</div>
					</Col>
					<Col>
						<div className="sample-block">Column 1</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<div className="sample-block">Column 1</div>
					</Col>
					<Col>
						<div className="sample-block">Column 1</div>
					</Col>
					<Col>
						<div className="sample-block">Column 1</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<div className="sample-block">Column 1</div>
					</Col>
					<Col>
						<div className="sample-block">Column 1</div>
					</Col>
					<Col>
						<div className="sample-block">Column 1</div>
					</Col>
					<Col>
						<div className="sample-block">Column 1</div>
					</Col>
				</Row>
			</div>
		);
	}
}

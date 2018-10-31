import React, { Component } from 'react';

import Col from './col';

export default class Input extends Component {
	render() {
		const type = this.props.type
			? this.props.type
			: 'text'
			;

		const placeholder = this.props.placeholder
			? this.props.placeholder
			: ''
			;

		const fieldClass = this.props.fieldClass
			? 'forminator-input ' + this.props.fieldClass
			: 'forminator-input'
			;

		return(
			<Col>
				<div className="forminator-field">
					{ this.props.label &&
						<label htmlFor={ `forminator-field-${ this.props.property }` }
							className="forminator-label">
							{ this.props.label }
						</label>
					}
					<input type={ type }
						placeholder={ placeholder }
						size="1"
						id={ `forminator-field-${ this.props.property }` }
						className={ fieldClass } />
					{ this.props.description &&
						<span className="forminator-description">{ this.props.description }</span>
					}
				</div>
			</Col>
		);
	}
}

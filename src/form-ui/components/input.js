import React, { Component } from 'react';

import Col from './col';

export default class Input extends Component {
	constructor() {
		super();

		this.state = {
			isHovered: false
		};

		this.handleHover = this.handleHover.bind(this);
	}

	handleHover(){
		this.setState();
	}

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

		const hoverClass = this.state.isHovered ? ' forminato-is_hover' : '';

		const fieldError = this.props.hasError
			? ' forminator-has_error'
			: ''
			;

		let description = '';

		let errorMessage = '';

		if ( this.props.description || this.props.helper ) {
			description = (
				<span className="forminator-description">
					{ this.props.description }
					{ this.props.helper &&
						<span>{ this.props.helper }</span>
					}
				</span>
			);
		}

		if ( this.props.isRequired ) {
			errorMessage = (
				<span className="forminator-error-message">
					This field is required.
				</span>
			);
		}

		return(
			<Col>
				<div className={ `forminator-field${ fieldError }${ hoverClass }` }
					onMouseEnter={ this.handleHover }
					onMouseLeave={ this.handleHover }>
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
					{ errorMessage }
					{ description }
				</div>
			</Col>
		);
	}
}

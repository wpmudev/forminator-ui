import React, { Component } from 'react';

import Col from './col';

export default class Textarea extends Component {
	constructor() {
		super();

		this.state = {
			hover: false,
			focus: false
		};

		this.onHover = this.onHover.bind( this );
		this.onFocus = this.onFocus.bind( this );
		this.onBlur  = this.onBlur.bind( this );
	}

	onHover() {
		this.setState({
			hover: !this.state.hover
		});
	}

	onFocus() {
		this.setState({
			focus: true
		})
	}

	onBlur() {
		this.setState({
			focus: false
		});
	}

	render() {
		const placeholder = this.props.placeholder
			? this.props.placeholder
			: ''
			;

		const fieldClass = this.props.fieldClass
			? 'forminator-textarea ' + this.props.fieldClass
			: 'forminator-textarea'
			;

		const hoverClass = this.state.hover ? ' forminator-is_hover' : '';

		const focusClass = this.state.focus ? ' forminator-is_active' : '';

		const fieldError = this.props.hasError
			? ' forminator-has_error'
			: ''
			;

		let description = '';

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

		let errorMessage = '';

		if ( this.props.isRequired ) {
			errorMessage = (
				<span className="forminator-error-message">
					This field is required.
				</span>
			);
		}

		let fieldTextarea = (
			<textarea placeholder={ placeholder }
				id={ `forminator-field-${ this.props.property }` }
				className={ fieldClass }
				onBlur={ this.onBlur }
				onFocus={ this.onFocus } />
		);

		if ( this.props.isMaterial ) {
			fieldTextarea = (
				<div className="forminator-textarea--wrap">
					{ fieldTextarea }
				</div>
			);
		}

		return(
			<Col>
				<div className={ `forminator-field${ fieldError }${ hoverClass }${ focusClass }` }
					onMouseEnter={ this.onHover }
					onMouseLeave={ this.onHover }>
					{ this.props.label &&
						<label htmlFor={ `forminator-field-${ this.props.property }` }
							className={ `forminator-label${ this.props.isMaterial ? ' forminator-floating--textarea' : '' }` }>
							{ this.props.label }
							{ this.props.isRequired ? ' ' : '' }
							{ this.props.isRequired ? ( <span className="forminator-required">*</span> ) : '' }
						</label>
					}
					{ fieldTextarea }
					{ errorMessage }
					{ description }
				</div>
			</Col>
		);
	}
}

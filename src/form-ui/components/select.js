import React, { Component } from 'react';

import Col from './col';

export default class Select extends Component {
	constructor() {
		super();

		this.state = {
			hover: false
		};

		this.onHover = this.onHover.bind( this );
	}

	onHover() {
		this.setState({
			hover: !this.state.hover
		});
	}

	render() {
		const hoverClass = this.state.hover
			? ' forminator-is_hover'
			: ''
			;

		let labelClass = 'forminator-label';

		if ( 'material' === this.props.design ) {
			labelClass = 'forminator-label forminator-floating--input';
		}

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

		return (
			<Col>
				<div className={ `forminator-field${ hoverClass }` }
					onMouseEnter={ this.onHover }
					onMouseLeave={ this.onHover }>
					{ this.props.label &&
						<label htmlFor={ `forminator-field-${ this.props.property }` }
							className={ labelClass }>
							{ this.props.label }
							{ this.props.isRequired ? ' ' : '' }
							{ this.props.isRequired ? ( <span className="forminator-required">*</span> ) : '' }
						</label>
					}
					<select>
						<option>Option 1</option>
						<option>Option 2</option>
						<option>Option 3</option>
						<option>Option 4</option>
						<option>Option 5</option>
						<option>Option 6</option>
						<option>Option 7</option>
						<option>Option 8</option>
						<option>Option 9</option>
						<option>Option 10</option>
					</select>
					{ description }
				</div>
			</Col>
		);
	}
}
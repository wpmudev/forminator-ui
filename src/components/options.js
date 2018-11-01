import React, { Component } from 'react';

export default class Options extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			active: this.props.default
				? this.props.default
				: ''
				,
		};
	}

	toggleValue( value ) {
		this.setState( {
			active: value,
		} );
	}

	render() {
		const optionMenu = React.Children.map(
			this.props.children,
			option => {
				if ( ! option ) {
					return;
				}

				return (
					<div className={ 'option' +
						( option.props.value === this.state.active
							? ' active'
							: ''
						) }
						onClick={ this.toggleValue.bind( this, option.props.value ) }>
						{ option.props.label }
					</div>
				);
			}
		);

		const optionContent = React.Children.map(
			this.props.children,
			option => {
				if ( ! option ) {
					return;
				}

				return (
					<div className={ 'option' +
						( option.props.value === this.state.active
							? ' active'
							: ''
						) }>
						{ option.props.value === this.state.active && option }
					</div>
				);
			}
		);

		return (
			<div className="options">
				<div className="options-menu">
					{ optionMenu }
				</div>
				<div className="options-content">
					{ optionContent }
				</div>
			</div>
		);
	}
}

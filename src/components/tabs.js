import React, { Component } from 'react';

export default class Tabs extends Component {
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
		const tabMenu = React.Children.map(
			this.props.children,
			tab => {
				if ( ! tab ) {
					return;
				}

				return (
					<div className={ 'tab-menu' +
						( tab.props.value === this.state.active
							? ' active'
							: ''
						) }
						onClick={ this.toggleValue.bind( this, tab.props.value ) }>
						{ tab.props.label }
					</div>
				);
			}
		);

		const tabContent = React.Children.map(
			this.props.children,
			tab => {
				if ( ! tab ) {
					return;
				}

				return (
					<div className={ 'tab-content' +
						( tab.props.value === this.state.active
							? ' active'
							: ''
						) }>
						{ tab.props.value === this.state.active && tab }
					</div>
				);
			}
		);

		return (
			<div className="tabs">
				<div className="tabs-menu">
					{ tabMenu }
				</div>
				<div className="tabs-content">
					{ tabContent }
				</div>
			</div>
		);
	}
}

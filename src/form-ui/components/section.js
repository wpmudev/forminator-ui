import React, { Component } from 'react';

import Col from './col';

export default class Section extends Component {
	render() {
		return(
			<Col>
				<div className="forminator-field">
					{ this.props.title &&
						<h2 className="forminator-title">{ this.props.title }</h2>
					}
					{ this.props.subtitle &&
						<p className="forminator-subtitle">{ this.props.subtitle }</p>
					}
					{ this.props.hasBorder &&
						<hr className="forminator-border" />
					}
				</div>
			</Col>
		);
	}
}

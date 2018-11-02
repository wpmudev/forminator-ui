import React, { Component } from 'react';

import Header from '../containers/header';
import Tabs from '../components/tabs';

import Grid from './containers/grid';
import Elements from './containers/elements';
import Sample from './containers/sample';

import './themes/default.css';
import './themes/flat.css';
import './themes/bold.css';
import './themes/material.css';

export default class PageForm extends Component {
	render() {
		return(
			<React.Fragment>
				<Header title="Form UI"
					subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
				<section>
					<Tabs default="grid">
						<Grid label="Grid"
							value="grid" />
						<Elements label="Elements"
							value="elements" />
						<Sample label="Sample Form"
							value="sample" />
					</Tabs>
				</section>
			</React.Fragment>
		);
	}
}

import React, { Component } from 'react';

import Header from '../containers/header';
import Tabs from '../components/tabs';

import Grid from './containers/grid';
import Default from './containers/default';
import Flat from './containers/flat';
import Bold from './containers/bold';
import Material from './containers/material';

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
						<Default label="Default"
							value="default" />
						<Flat label="Flat"
							value="flat" />
						<Bold label="Bold"
							value="bold" />
						<Material label="Material"
							value="material" />
					</Tabs>
				</section>
			</React.Fragment>
		);
	}
}

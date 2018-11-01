import React, { Component } from 'react';

import Header from '../containers/header';
import Tabs from '../components/tabs';

import Grid from './containers/grid';
import Elements from './containers/elements';
import Themes from './containers/themes';
import Sample from './containers/sample';

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
						<Themes label="Themes"
							value="themes" />
						<Sample label="Sample Form"
							value="sample" />
					</Tabs>
				</section>
			</React.Fragment>
		);
	}
}

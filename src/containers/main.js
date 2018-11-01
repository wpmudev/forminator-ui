import React, { Component } from 'react';

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import PageHome from './home';
import PageForm from '../form-ui/page';
import PageQuiz from '../quiz-ui/page';
import PagePoll from '../poll-ui/page';

const Home = () => <PageHome />;
const Form = () => <PageForm />;
const Poll = () => <PagePoll />;
const Quiz = () => <PageQuiz />;

class Main extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			open: false,
		}
	}

	openMenu() {
		this.setState( {
			open: ! this.state.open,
		} );
	}

	render() {
		const { open } = this.state;

		let pageClass = '';

		if ( open ) {
			pageClass = ' is-open';
		}

		return (
			<Router>

				<div className={ `demo-site${ pageClass }` }>

					<nav className="navigation-main">

						<button className="navigation-button"
							onClick={ () => this.openMenu() }>
							<i aria-hidden="true"></i>
							<i aria-hidden="true"></i>
							<i aria-hidden="true"></i>
							<span>Menu</span>
						</button>

						<span className="navigation-title">
							Forminator UI
						</span>

						<ul className="navigation-side">
							<li>
								<NavLink to="/"
									exact={ true }
									activeClassName="current">
									Home
								</NavLink>
							</li>
							<li>
								<NavLink to="/form/"
									exact={ true }
									activeClassName="current">
									Form
								</NavLink>
							</li>
							<li>
								<NavLink to="/poll/"
									exact={ true }
									activeClassName="current">
									Poll
								</NavLink>
							</li>
							<li>
								<NavLink to="/quiz/"
									exact={ true }
									activeClassName="current">
									Quiz
								</NavLink>
							</li>
						</ul>

					</nav>

					<Route path="/" exact component={ Home } />
					<Route path="/form/" component={ Form } />
					<Route path="/poll/" component={ Poll } />
					<Route path="/quiz/" component={ Quiz } />

				</div>

			</Router>
		);
  	}
}

export default Main;
import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import PageForms from '../components/page-forms';
import PageQuizzes from '../components/page-quizzes';
import PagePolls from '../components/page-polls';

const Index = () => <h2>Home</h2>;
const Form = () => <PageForms />;
const Poll = () => <PagePolls />;
const Quiz = () => <PageQuizzes />;

class Main extends Component {
	render() {
		return (
			<Router>

				<div className="page-wrap menu-open">

					<nav>
						<button className="navigation-button">
							<i aria-hidden="true"></i>
							<i aria-hidden="true"></i>
							<i aria-hidden="true"></i>
							<span>Menu</span>
						</button>
						<span className="navigation-title">
							Forminator UI
						</span>
						<ul className="navigation-menu">
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/form/">Form</Link>
							</li>
							<li>
								<Link to="/poll/">Poll</Link>
							</li>
							<li>
								<Link to="/quiz/">Quiz</Link>
							</li>
						</ul>
					</nav>

					<section>
						<Route path="/" exact component={Index} />
						<Route path="/form/" component={Form} />
						<Route path="/poll/" component={Poll} />
						<Route path="/quiz/" component={Quiz} />
					</section>

				</div>

			</Router>
		);
  	}
}

export default Main;
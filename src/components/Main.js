import React from 'react';
import {Switch,Route} from 'react-router-dom';

import Lista from './Lista';
import About from './About';
import Chart from './Chart';
import Login from './Login';


const Main = () => (
	<main>
		<Switch>
		<Route exact path="/" component={Chart} />
		<Route exact path="/lista" component={Lista} />
		<Route exact path="/about" component={About} />
		<Route exact path="/login" component={Login} />
		</Switch>
	</main>

	)


export default Main;

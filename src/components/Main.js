import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';

import Lista from './Lista';
import About from './About';


import Logout from './Logout';
import Login from './Login';
import Recyclers from './Recyclers';
import InstrResident from './InstrResident';
import Test from './Test';
import Conciencity from './Conciencity/Conciencity';
import Managers  from './Managers/Managers';
import Residences from './Residences/Residences';


const Main = () => (
	<main>
		<Switch>
		<Route exact path="/Residences/Home" component={Residences} />
		<Route exact path="/Managers/Home" component={Managers} />
		<Route exact path="/Conciencity/Home" component={Conciencity } />
		<Redirect from="/Conciencity" to="/Conciencity/Home" />
		<Redirect from="/Managers" to="/Managers/Home" />
		<Redirect from="/Residences" to="/Residences/Home" />
		
		<Route exact path="/" component={Login} />
		<Route exact path="/logout" component={Logout} />
		<Route exact path="/Recyclers" component={Recyclers} />
		<Route exact path="/Test" component={Test} />

		</Switch>
	</main>

	)


export default Main;

import React from 'react';
import {Switch,Route} from 'react-router-dom';

import Lista from './Lista';
import About from './About';
import Residences from './Residences';
import CommunityManagers  from './CommunityManagers';
import Logout from './Logout';
import Login from './Login';
import Recyclers from './Recyclers';
import InstrResident from './InstrResident';


const Main = () => (
	<main>
		<Switch>
		<Route exact path="/Residences" component={Residences} />
		<Route exact path="/CommunityManagers" component={CommunityManagers } />
		<Route exact path="/" component={Login} />
		<Route exact path="/logout" component={Logout} />
		<Route exact path="/Recyclers" component={Recyclers} />
		<Route exact path="/InstrResident" component={InstrResident} />
		</Switch>
	</main>

	)


export default Main;

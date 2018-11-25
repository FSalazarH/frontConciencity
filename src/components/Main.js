import React from 'react';
import {Switch,Route} from 'react-router-dom';

import Lista from './Lista';
import About from './About';
import Residences from './Residences';
import CommunityManagers  from './CommunityManagers';
import Logout from './Logout';
import Login from './Login';
import Recycler from './Recycler';


const Main = () => (
	<main>
		<Switch>
		<Route exact path="/Residences" component={Residences} />
		<Route exact path="/CommunityManagers" component={CommunityManagers } />
		<Route exact path="/" component={Login} />
		<Route exact path="/logout" component={Logout} />
		<Route exact path="/Recycler" component={Recycler} />
		</Switch>
	</main>

	)


export default Main;

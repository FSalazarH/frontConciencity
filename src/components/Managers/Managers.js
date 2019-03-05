import React, {Component } from 'react';
import Navigation2 from '.././Navigation2';
import {BrowserRouter,Route,Switch,NavLink} from 'react-router-dom';
import {SideNav,Icon,Collection,CollectionItem} from 'react-materialize';
import Profile from '../Profile';

import Home from './Home';
import Instructives from './Instructives';



class Managers  extends Component{
	componentDidMount(){

		/*Redirecciona en caso de necesitarlo:  */
		var data = JSON.parse(sessionStorage.getItem('getData'));
		if(data){

			var sesionRequest = fetch("https://api-conciencity.herokuapp.com/api/Managers/" + data['id'] + "?access_token=" + data['token'])
				.then(response => response.json())			
				.then(parsedJson => {
					if(parsedJson['error'] ){
						console.log("Error de conexión: ",parsedJson['error']);
						this.props.history.push('/');
						
					}else{
						console.log("here ",parsedJson,data);
						this.setState({
								username: data['username'],
							  	load: false
						}); 
					}
				});

			Promise.all([sesionRequest]).then(values => { 
					console.log("request sucefull");
				});

		}else{
			this.props.history.push('/');
			
		}

    }


	constructor(props){
		super(props);
		this.state = {
			load: true,
			username: "Edificio I"
		}
	}


	render(){

		var load = this.state.load;
		var username = this.state.username;

		if(load){
			return(
				<div className="center">
					<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
					<div class="preloader-wrapper big active">
					   <div class="spinner-layer spinner-green-only">
					     <div class="circle-clipper left">
					       <div class="circle"></div>
					     </div><div class="gap-patch">
					       <div class="circle"></div>
					     </div><div class="circle-clipper right">
					       <div class="circle"></div>
					     </div>
					   </div>
					 </div>
					 </div>
				)

		}else{
			return(
					<BrowserRouter>
							<div>
								<Navigation2 name={username}/>


								<SideNav className="mysidenav">
								  <Collection >
								 		<NavLink to="/Managers/Home"  >
											<CollectionItem id="Home" href='#' active className=" bold">  

												<Icon> home </Icon>
												<span> Inicio </span>
											</CollectionItem>
										</NavLink>
										<NavLink to="/Managers/Instructives"  >
										  	<CollectionItem id="Instructives" href='#'  className="bold">  
										  		<Icon> note </Icon>
										  		 <span> Instructivos </span>
										  	</CollectionItem>
									  	</NavLink>
								  </Collection>
									
								</SideNav>

								<div style={{width: 1000, margin: '0 auto'}}>
						          
						          <Switch>
						              <Route exath path='/Managers/Home' component={Home} />
						              <Route exath path='/Managers/Instructives' component={Instructives} />
													<Route exath path='/Managers/Profile' component={Profile} />
						          </Switch>
						        </div>
					        </div>

					</BrowserRouter>

				);
		}

	}
		
}

export default Managers ;
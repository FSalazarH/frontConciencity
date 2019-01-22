import React, {Component } from 'react';
import Navigation2 from '../Navigation2';
import {Table,CardTitle,SideNav,Icon,Tab, Modal,Tabs,CardPanel,Card,Button,Collection,Row,Col,CollectionItem} from 'react-materialize';
import LineChart from '../LineChart';
import moment from 'moment';
import 'moment/locale/es' 


import {BrowserRouter,Router,Route,Switch, Link,NavLink} from 'react-router-dom';
import subtest1 from '../subtest1';
import subtest2 from '../subtest2';

class Conciencities extends Component{

	componentDidMount(){
		moment.locale('es'); 
		

		/*Redirecciona en caso de necesitarlo:  */
		var data = JSON.parse(sessionStorage.getItem('getData'));
		if(data){
			this.setState({'username':data['username']}); 

			var sesionRequest = fetch("https://api-conciencity.herokuapp.com/api/Conciencities/" + data['id'] + "?access_token=" + data['token'])
							.then(response => response.json())			
							.then(parsedJson => {
								if(parsedJson['error'] ){
									console.log("Error de conexión: ",parsedJson['error']);
									this.props.history.push('/');
								}else{
									
									this.setState({
									  	load: false
									}); 
								}
							});

			Promise.all([sesionRequest]).then(function(values){
			    console.log("The request arrived successfully.");
			});

		}else{
			this.props.history.push('/');
		}


		
	}

	constructor(props){
		super(props);
		this.state = {
			load: true,
			timeCollection: [],
			notificationCollection : [],
			username: "Conciencity"
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
				<div>
					<Navigation2 name={username}/>


					<BrowserRouter>
						<div>
							<SideNav className="mysidenav">
								  <Collection >
								  		<NavLink to="/Conciencities/home" >
											<CollectionItem active className="bold">  
												<Icon> dashboard </Icon>
												<span> Inicio </span>
											</CollectionItem>
										</NavLink>

										<NavLink to="/Conciencities/public">
										  	<CollectionItem  className="bold"> 
											  		<Icon> home </Icon>
											  		 <span> Comunidades </span>
										  	</CollectionItem>
										 </NavLink>

										<NavLink to="/Conciencities/private" >
										  	<CollectionItem  className="bold">  
											  		<Icon> people </Icon>
											  		 <span> Usuarios </span>
										  	</CollectionItem>
									  	</NavLink>
									  	<CollectionItem href='#'  className="bold">  
									  		<Icon> games </Icon>
									  		 <span> Dispositivos </span>
									  	</CollectionItem>
								  </Collection>
							</SideNav>


						
					        <div style={{width: 1000, margin: '0 auto'}}>
					          
					          <Switch>
					              <Route exath path='/Conciencities/home' component={subtest1} />
						          <Route exath path='/Conciencities/public' component={subtest1} />
						          <Route exath path='/Conciencities/private' component={subtest2} />
					          </Switch>
					        </div>
				        </div>
				     </BrowserRouter>

				     hello word


					
				</div>
				)
		}

	}
}



export default Conciencities;
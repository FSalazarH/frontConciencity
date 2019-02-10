import React, {Component } from 'react';
import Navigation2 from '../Navigation2';
import {Table,CardTitle,SideNav,Icon,Tab, Modal,Tabs,CardPanel,Card,Button,Collection,Row,Col,CollectionItem,Collapsible,CollapsibleItem} from 'react-materialize';
import LineChart from '../LineChart';
import moment from 'moment';
import 'moment/locale/es' 
import {BrowserRouter,Router,Route,Switch, Link,NavLink} from 'react-router-dom';

import Recyclers from './Recyclers';
import Residences from './Residences';
import Managers from './Managers';
import Communes from './Communes';
import Communities from './Communities';
import Buckets from './Buckets';
import Composters from './Composters';

import Home from './Home';

class Conciencity extends Component{

	componentDidMount(){
		moment.locale('es'); 
		
		;
		/*Redirecciona en caso de necesitarlo:  */
		var data = JSON.parse(sessionStorage.getItem('getData'));
		if(data){
			this.setState({'username':data['username']}); 

			var sesionRequest = fetch("https://api-conciencity.herokuapp.com/api/Conciencity/" + data['id'] + "?access_token=" + data['token'])
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
							<SideNav id="mysidenav" className="mysidenav">
								  <Collection>
								  		<NavLink to="/Conciencity/Home"  >
											<CollectionItem  id="Home" active={true} className="bold">  
												<Icon> dashboard </Icon>
												<span> Inicio </span>
											</CollectionItem>
										</NavLink>


										<NavLink to="/Conciencity/Communes" >
										  	<CollectionItem  id="Communes" active={false}  className="bold" > 
											  		<Icon> place </Icon>
											  		 <span> Comunas </span>
										  	</CollectionItem>
										 </NavLink>



										<NavLink to="/Conciencity/Communities" >
										  	<CollectionItem  id="Communities" active={false}  className="bold" > 
											  		<Icon> location_city </Icon>
											  		 <span> Comunidades </span>
										  	</CollectionItem>



										 </NavLink>

										<CollectionItem  id="users" href=''  className="bold">  
											 <Collapsible>
											   <CollapsibleItem header='Usuarios' icon='people'>
											       <Collection>
											       		<NavLink to="/Conciencity/Users/Residences" >
												    	  	<CollectionItem  id="Residences" className="bold">  
												    		  		<Icon> person </Icon>
												    		  		 <span> Residentes </span>
												    	  	</CollectionItem>
												      	</NavLink>

												      	<NavLink to="/Conciencity/Users/Recyclers" >
												    	  	<CollectionItem  id="Recyclers" className="bold">  
												    		  		<Icon> person </Icon>
												    		  		 <span> Recicladores </span>
												    	  	</CollectionItem>
												      	</NavLink>

												      	<NavLink to="/Conciencity/Users/Managers" >
												    	  	<CollectionItem  id="Managers" className="bold">  
												    		  		<Icon> person </Icon>
												    		  		 <span> Administradores </span>
												    	  	</CollectionItem>
												      	</NavLink>

												      	
											     	</Collection>
											   </CollapsibleItem>
											 </Collapsible>
										</CollectionItem>
									  	



									  
										<CollectionItem  id="dispositives" href=''  className="bold">  
											<Collapsible>
											 <CollapsibleItem header='Dispositivos' icon='games'>
											       <Collection>
											       		<NavLink to="/Conciencity/Dispositives/Composters" >
												    	  	<CollectionItem  id="Composters" className="bold">  
												    		  		<Icon> view_agenda </Icon>
												    		  		 <span> Compostera </span>
												    	  	</CollectionItem>
												      	</NavLink>

												      	<NavLink to="/Conciencity/Dispositives/Buckets" >
												    	  	<CollectionItem  id="Buckets" className="bold">  
												    		  		<Icon> local_drink </Icon>
												    		  		 <span> Balde </span>
												    	  	</CollectionItem>
												      	</NavLink>
												      	
											     	</Collection>
											   </CollapsibleItem>
											   </Collapsible>
										</CollectionItem>
									  	
								  </Collection>
							</SideNav>


						
					        <div style={{width: 1000, margin: '0 auto'}}>
					          
					          <Switch >
					              <Route exath path='/Conciencity/Home' component={Home} />
					              <Route exath path='/Conciencity/Communes' component={Communes} />
					              <Route exath path='/Conciencity/Communities' component={Communities} />
						          <Route exath path='/Conciencity/Users/Recyclers' component={Recyclers} />
						          <Route exath path='/Conciencity/Users/Residences' component={Residences} />
						          <Route exath path='/Conciencity/Users/Managers' component={Managers} />
						          <Route exath path='/Conciencity/Dispositives/Buckets' component={Buckets} />
						          <Route exath path='/Conciencity/Dispositives/Composters' component={Composters} />
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



export default Conciencity;
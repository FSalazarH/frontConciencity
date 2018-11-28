import React, {Component } from 'react';
import Navigation3 from './Navigation3';
import {Table,CardTitle,SideNav,Icon,Tab, Tabs,CardPanel,Card,Button,Collection,Row,Col,CollectionItem} from 'react-materialize';
import LineChart from './LineChart';
import moment from 'moment';
import 'moment/locale/es' 


class Recyclers  extends Component{




	componentDidMount(){

		moment.locale('es'); 
		

		/*Redirecciona en caso de necesitarlo:  */
		var data = JSON.parse(sessionStorage.getItem('getData'));
		if(data){
			this.setState({'username':data['username']}); 

			var sesionRequest = fetch("http://localhost:3000/api/Recyclers/" + data['id'] + "?access_token=" + data['token'])
							.then(response => response.json())			
							.then(parsedJson => {
								if(parsedJson['error'] ){
									console.log("Error de conexión: ",parsedJson['error']);
									this.props.history.push('/');
								}
							});
			var timeRequest = fetch("http://localhost:3000/api/Recyclers/" + data['id'] + "/community/composter/slot/sensor/measurementsSensor?access_token=" + data['token'])
							.then(response => response.json())			
							.then(parsedJson => {
								if(parsedJson['error'] ){
									console.log("Error de conexión: ",parsedJson['error']);
								}else{
									console.log(parsedJson);
									this.setState({
										timeCollection: parsedJson,
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
			username: "Reciclador"
		}
	}


	render(){

		var timeCollection  = this.state.timeCollection ;
		var username = this.state.username;
		console.log("aqui",username);
		var load = this.state.load;
		var data = [];
		var labels = [];




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

			for (var i = 0; i < timeCollection.length ; i++) {
				var register = timeCollection[i];

				var date = moment(register['date']);
				labels.push(date.format("HH:mm"));
				data.push(parseFloat(register['value'])*100);			
			};

			var box1;
			if(timeCollection.length>0){
				box1 = timeCollection[timeCollection.length-1]['value'];
			}


			return(

				<div> 

					<Navigation3 name={username}/>
					<SideNav className="mysidenav2">
						  <Collection >
								<CollectionItem href='#' active className="bold">  

									<Icon> home </Icon>
									<span> Inicio </span>
								</CollectionItem>
							  	<CollectionItem href='#'  className="bold">  
							  		<Icon> note </Icon>
							  		 <span> Instructivos </span>
							  	</CollectionItem>
							  	<CollectionItem href='#'  className="bold">  
							  		<Icon> notifications </Icon>
							  		 <span> Notificaciones </span>
							  	</CollectionItem>
						  </Collection>
					</SideNav>

					<div className="inSideNav">
							<br/> <br/> 
							<Row className="ml-2">
							  <Col s={6} m={3} offset="m1">
							        <CardPanel className="wave-card-2">
							        	<div className="bold center">
							        		<h5>  Cajon 1 </h5>
							        	</div>
							        	<Row>
							        		<Col s={6} m={5}>
							        			<img  width="200px" src= {window.location.origin + '/img/good.png'}  className="responsive-img"/> 
							        		</Col>
							        		<Col s={6} m={7}>
							        			<br/> 
							        			<h3 className="center">   <span>  {box1*100}% </span> </h3>
							        		</Col>

							        	</Row>
							        </CardPanel>
							  </Col>
							  <Col s={6} m={3}>
							       <CardPanel className="wave-card-2">
							        	<div className="bold center">
							        		<h5>  Cajon 2 </h5>
							        	</div>
							        	<Row>
							        		<Col s={6} m={5}>
							        			<img  width="200px" src= {window.location.origin + '/img/bad.png'}  className="responsive-img"/> 
							        		</Col>
							        		<Col s={6} m={7}>
							        			<br/>
							        			<h3 className="center">    <span> 37% </span> </h3>
							        		</Col>

							        	</Row>
							        </CardPanel>
							  </Col>
							  <Col s={6} m={3}>
							       <CardPanel className="wave-card-2">
							        	<div className="bold center">
							        		<h5>  Cajon 3 </h5>
							        	</div>
							        	<Row>
							        		<Col s={6} m={5}>
							        			<img  width="200px" src= {window.location.origin + '/img/good.png'}  className="responsive-img"/> 
							        		</Col>
							        		<Col s={6} m={7}>
							        			<br/>
							        			<h3 className="center">    <span> 85% </span> </h3>
							        		</Col>

							        	</Row>
							        </CardPanel>
							  </Col>

							  <Col s={6} m={8} offset="m1">
							        <CardPanel className="wave-card-2">
							        	<h4 className="bold center"> Humedad vs Tiempo </h4>
							        	<LineChart color="blue" data={data} labels = {labels} />
							        </CardPanel>
							  </Col>
							 </Row>
					</div>




				</div>

				);
		}

		
	}
}



export default Recyclers;
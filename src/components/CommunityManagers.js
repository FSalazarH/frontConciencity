import React, {Component } from 'react';
import Navigation2 from './Navigation2';
import {Table,CardTitle,SideNav,Icon,Tab, Tabs,CardPanel,Card,Button,Collection,Row,Col,CollectionItem} from 'react-materialize';
import BarChart from './BarChart';
import LineChart from './LineChart';
import moment from 'moment';
import 'moment/locale/es' 



class CommunityManagers  extends Component{




	componentDidMount(){

		moment.locale('es'); 

		/*Redirecciona en caso de necesitarlo:  */
		var data = JSON.parse(sessionStorage.getItem('getData'));
		if(data){

			var sesionRequest = fetch("http://localhost:3000/api/CommunityManagers/" + data['id'] + "?access_token=" + data['token'])
				.then(response => response.json())			
				.then(parsedJson => {
					if(parsedJson['error'] ){
						console.log("Error de conexión: ",parsedJson['error']);
						this.props.history.push('/');
					}
				});

			var totalRequest = fetch("http://localhost:3000/api/CommunityManagers/" + data['id'] + "/community/residences/totalWaste?access_token=" + data['token'])
				.then(response2 => response2.json())
				.then(parsedJson2 => {
					if(parsedJson2['error'] ){
						console.log("Error de conexión: ",parsedJson2['error']);
					}else{
						this.setState({
						  wasteCollection: parsedJson2
						}); 

				
					}
				});
				


			var flootRequest = fetch("http://localhost:3000/api/CommunityManagers/" + data['id'] + "/community/residences/wasteByFloor/1?access_token=" + data['token'])
				.then(response4 => response4.json())
				.then(parsedJson4 => {
					if(parsedJson4['error'] ){
						console.log("Error de conexión: ",parsedJson4['error']);
					}else{
						this.setState({
							flootCollection: parsedJson4
						}); 
					}
				})
			var flootRequest2 = fetch("http://localhost:3000/api/CommunityManagers/" + data['id'] + "/community/residences/wasteByFloor/3?access_token=" + data['token'])
				.then(response5 => response5.json())
				.then(parsedJson5 => {
					if(parsedJson5['error'] ){
						console.log("Error de conexión: ",parsedJson5['error']);
					}else{
						this.setState({
							flootCollection2: parsedJson5
						}); 
					}
				})
			

			var flootRequest3 = fetch("http://localhost:3000/api/CommunityManagers/" + data['id'] + "/community/residences/wasteByFloor/6?access_token=" + data['token'])
				.then(response6 => response6.json())
				.then(parsedJson6 => {
					if(parsedJson6['error'] ){
						console.log("Error de conexión: ",parsedJson6['error']);
					}else{
						this.setState({
							flootCollection3: parsedJson6,
						  	username: data['username'],
						  	load: false
						}); 
					}
				})
			



			Promise.all([sesionRequest,totalRequest],flootRequest,flootRequest2,flootRequest3).then(values => { 
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
			username: 'Edificio I',
			wasteCollection: {},
			flootCollection: [],
			flootCollection2: [],
			flootCollection3: []
		}
	}


	render(){
		/*const imgStyle = {
			'margin-top': '15px',
		  	'textAlign': 'center'
		};*/
		var wasteCollection  = this.state.wasteCollection;
		var username  = this.state.username;
		var flootCollection  = this.state.flootCollection;
		var flootCollection2 = this.state.flootCollection2;
		var flootCollection3 = this.state.flootCollection3;
		var load = this.state.load;
		var data = [];
		var labels = [];
		var data2 = [];
		var labels2 = [];
		var data3 = [];
		var labels3 = [];
		var data4 = [];
		var labels4 = [];


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

			// Configura data para el grafico de linea

			for (var i = 3; i > -1; i--) {
				var register = wasteCollection[i];

				if(register['date']){
					var date = moment(register['date']);

					labels.push(date.format('D MMM'));
				}else{
					labels.push("day");
				}
				if(register['total']){
					data.push(register['total']);
				}else{
					data.push(0);
				}
				
			};

			

			//Inicializamos un json con los pisos
			var st = '{';
			for (var i = 0; i < 4 ; i++) {
				st+= '"' +  (i+1).toString() + '":{"totalWeights":0},';
			}
			st = st.slice(0,st.length-1) + '}';
			var floot = JSON.parse(st);
			var floot2 = JSON.parse(st);
			var floot3 = JSON.parse(st);
			console.log("paso",this.state);


			var recyclerName;
			if(flootCollection.length>0){
				recyclerName = flootCollection[ flootCollection.length-1].recycler;
			}

			

			//Sumamos los pesos
			for (var i = 0; i < flootCollection.length-1 ; i++) {
				var register = flootCollection[i];
				var f = register['floor'];
				var w = register['totalWeights'];

				floot[f]['totalWeights'] += w;				
			};

			for (var i = 0; i < flootCollection2.length-1 ; i++) {
				var register = flootCollection2[i];
				var f = register['floor'];
				var w = register['totalWeights'];

				floot2[f]['totalWeights'] += w;				
			};
			
			for (var i = 0; i < flootCollection3.length-1 ; i++) {
				var register = flootCollection3[i];
				var f = register['floor'];
				var w = register['totalWeights'];

				floot3[f]['totalWeights'] += w;				
			};

			// Ordena data para el grafico de barra horizontal
			for (var i = 4; i > 0 ; i--) {

				labels2.push("Piso " + (i).toString() );
				data2.push(floot[(i).toString()]['totalWeights']);
			}
						// Ordena data para el grafico de barra horizontal
			for (var i = 4; i > 0 ; i--) {

				labels3.push("Piso " + (i).toString() );
				data3.push(floot2[(i).toString()]['totalWeights']);
			}
						// Ordena data para el grafico de barra horizontal
			for (var i = 4; i > 0 ; i--) {

				labels4.push("Piso " + (i).toString() );
				data4.push(floot3[(i).toString()]['totalWeights']);
			}




			return(
					<div>
						<Navigation2 name={username}/>
						<SideNav className="mysidenav">
						  <Collection >
								<CollectionItem href='#' active className=" bold">  

									<Icon> home </Icon>
									<span> Inicio </span>
								</CollectionItem>
							  	<CollectionItem href='#'  className="bold">  
							  		<Icon> note </Icon>
							  		 <span> Instructivos </span>
							  	</CollectionItem>
						  </Collection>
						</SideNav>

						<div className="inSideNav"> 
							<Row className="">
							  <Col s={6} m={4} >
							        <CardPanel className="box300 wave-card-1">
							            <Row>
							            	<Col m={3} s={1} xl={3}>
							            		<img src= {window.location.origin + '/img/separation.png'}  className="responsive-img"/>
							            	</Col>
							            	<Col m={8} s={10}>
							            		<h5> Separación en origen </h5>
							            	</Col>
							            	<Col s={12}>
							            		<LineChart data={data} labels={labels}/>
							            	</Col>
							            </Row>
							        </CardPanel>
							  </Col>
							  <Col s={6} m={4}>
							        <CardPanel className="box300 wave-card-1">
							            <Row>
							            	<Col m={4} s={1} xl={3}>
							            		<img src= {window.location.origin + '/img/collector2.png'}  className="responsive-img"/>
							            	</Col>
							            	<Col m={8} s={10}>
							            		<h5> Recolección </h5>
							            		<br/> 
							            		
							            	</Col>

							            	<Col s={12} m={12}>
							            		<Table>
												  <tbody>
												    <tr>
												      <td className="bold">Nombre recolector</td>
												      <td> {recyclerName} </td>
												    </tr>
												    <tr>
												      <td className="bold"> Residuos recolectados </td>
												      <td> 100kg </td>
												    </tr>
												    <tr>
												      <td className="bold">Aporte ambiental</td>
												      <td> 30 e kg</td>
												    </tr>

												  </tbody>
												</Table>

							            	</Col>
							            </Row>
							        </CardPanel>
							  </Col>
							  <Col s={6} m={4}>
							        <CardPanel className="box300 wave-card-1">
							            <Row>
							            	<Col m={3} s={1} xl={3}>
							            		<img  src= {window.location.origin + '/img/compost.png'}  className="responsive-img"/>
							            	</Col>
							            	<Col m={8} s={10}>
							            		<h5> Transformación </h5>
							            		<br/> <br/> 
							            	</Col>
							            	<Col s={12} m={12}>
							            		<Table>
												  <tbody>
												    <tr>
												      <td className="bold">Estado compostera</td>
												      <td> 75% Humedad </td>
												    </tr>
												    <tr>
												      <td className="bold"> Residuos transformados </td>
												      <td> 200kg </td>
												    </tr>

												  </tbody>
												</Table>
							            	</Col>
							            </Row>
							        </CardPanel>
							  </Col>
							  <Col s={12} m={8} offset="m2" >
							 		 <Card>
							 		 	<h6 className="bold center"> Residuos segun piso </h6>
								  		<Tabs className='green z-depth-1'>
										    <Tab title="6 Meses"><BarChart type="horizontal" data={data4} labels={labels4} /></Tab>
										    <Tab title="3 Mes" active> <BarChart type="horizontal" data={data3} color="green" labels={labels3} /> </Tab>
										    <Tab title="1 Mes"> <BarChart type="horizontal" data={data2} labels={labels2} /></Tab> 
										</Tabs>
								  	
							  		</Card>
							  </Col>
							</Row>

						</div>
					</div>

				);
		}

	}
		
}

export default CommunityManagers ;
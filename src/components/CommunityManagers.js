import React, {Component } from 'react';
import Navigation2 from './Navigation2';
import {Table,CardTitle,SideNav,Icon,Tab, Tabs,CardPanel,Card,Button,Collection,Row,Col,CollectionItem} from 'react-materialize';
import BarChart from './BarChart';
import LineChart from './LineChart';


class CommunityManagers  extends Component{




	componentDidMount(){

		
		/*Redirecciona en caso de necesitarlo:  */
		var data = JSON.parse(sessionStorage.getItem('getData'));
		
		if(data){
			fetch("http://localhost:3000/api/CommunityManagers/" + data['id'] + "?access_token=" + data['token'])
			.then(response => response.json())
			.then(parsedJson => {
				if(parsedJson['error'] ){
					this.props.history.push('/');
				}else{
					
					if(data){

						
						fetch("http://localhost:3000/api/CommunityManagers/" + data['id'] + "/community/residences/totalWaste?access_token=" + data['token'])
						.then(response2 => response2.json())
						.then(parsedJson2 => {
							if(parsedJson2['error'] ){
								console.log("Error de conexión: ",parsedJson2['error']);
							}else{
								console.log("for heeere");
								console.log(parsedJson2);

								/*
								this.setState({
								  wasteCollection: parsedJson2['data'][0]['buckets'][0]['wasteCollections']
								}); 
								console.log("for heeere2",this.state); */
							}
						});
						
					}else{
						console.log("Error de conexión");
					}
					


				}
			});
		}else{
			this.props.history.push('/');
		}
		
    }


	constructor(props){
		super(props);
		this.state = {
			load: false,
			wasteCollection: [
				{
					day: "Piso 1",
					weight: 30,
					recyclerName: "Pedrito Tomatito"
				},
				{
					day: "Piso 2",
					weight: 22,
					recyclerName: "Pedrito Tomatito"
				},
				{
					day: "Piso 3",
					weight: 25,
					recyclerName: "Pedrito Tomatito"
				}

			]
		}
	}


	render(){
		/*const imgStyle = {
			'margin-top': '15px',
		  	'textAlign': 'center'
		};*/
		const wasteCollection = this.state.wasteCollection;
		var data = [];
		var labels = [];


		// Ordena el json para ser compatible con el grafico
		for (var i = 0; i < wasteCollection.length; i++) {
			var register = wasteCollection[i];
			labels.push(register['day']);
			data.push(register['weight']);
		};

		return(
				<div>
					<Navigation2/>
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
						<br/> <br/> 
						<Row className="ml-2">
						  <Col s={6} m={4}>
						        <CardPanel className="wave-card-1">
						            <Row>
						            	<Col m={3} s={1} xl={3}>
						            		<img src= {window.location.origin + '/img/separation.png'}  className="responsive-img"/>
						            	</Col>
						            	<Col m={8} s={10}>
						            		<h5> Separación en origen </h5>
						            	</Col>
						            	<Col s={12}>
						            		<LineChart />
						            		<br/> <br/>
						            	</Col>


						            </Row>
						        </CardPanel>
						  </Col>
						  <Col s={6} m={4}>
						        <CardPanel className="wave-card-1">
						            <Row>
						            	<Col m={4} s={1} xl={3}>
						            		<img src= {window.location.origin + '/img/collector2.png'}  className="responsive-img"/>
						            	</Col>
						            	<Col m={8} s={10}>
						            		<h5> Recolección </h5>
						            		<br/> <br/> 
						            	</Col>
						            	<Col s={4} m={4}>
						            		<br/> <br/>
						            		<img  alt="20px"  width="120" src= {window.location.origin + '/img/USUARIO-RECOLECTOR.png'}  className="responsive-img"/>
						            	</Col>
						            	<Col s={8} m={8}>
						            		<Table>
											  <tbody>
											    <tr>
											      <td className="bold">Nombre recolector</td>
											      <td>Pedro Tomate </td>
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
						        <CardPanel className="wave-card-1">


						             <Row>
						            	<Col m={3} s={1} xl={3}>
						            		<img  src= {window.location.origin + '/img/recycling.png'}  className="responsive-img"/>
						            	</Col>
						            	<Col m={8} s={10}>
						            		<h5> Transformación </h5>
						            		<br/> <br/> 
						            	</Col>
						            	<Col s={4} m={4}>
						            		<br/> <br/> 
						            		<img  src= {window.location.origin + '/img/compost.png'}  className="responsive-img"/>
						            	</Col>
						            	<Col s={8} m={8}>
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
											<br/><br/>
						            	</Col>
						            </Row>
						        </CardPanel>
						  </Col>
						  <Col s={8} m={8} offset="m1" >
						 		 <Card>
							  		<h4 className="bold center"> Residuos segun piso </h4>
							  		<Tabs className='green z-depth-1'>
									    <Tab title="6 Meses"><BarChart data={data} labels={labels} /></Tab>
									    <Tab title="3 Mes" active> <BarChart data={data} color="green" labels={labels} /> </Tab>
									    <Tab title="1 Mes"> <BarChart data={data} labels={labels} /></Tab> 
									</Tabs>
							  		

						  		</Card>
						  </Col>
						</Row>

					</div>
				</div>

			);
	}
		
}

export default CommunityManagers ;
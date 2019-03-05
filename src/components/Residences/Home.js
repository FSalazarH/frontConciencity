import React, {Component } from 'react';
import BarChart from '.././BarChart';
import LineChart from '.././LineChart';
import WasteBox from '.././WasteBox';
import {Parallax} from 'react-parallax';
import moment from 'moment';
import 'moment/locale/es' ;
import { Row, Col, Tab, Tabs, Button, Card } from 'react-materialize';

class Home extends Component{

	componentDidMount(){

		
		//var elems = document.querySelectorAll('.tooltipped');
		//var instances = window.M.Tooltip.init(elems,{});
		

		var data = JSON.parse(sessionStorage.getItem('getData'));
		var wasteCollections = []
		var userData=this.state.userData;
		var requestWasteCollection = fetch("https://api-conciencity.herokuapp.com/api/Residences/" + data['id'] + "/lastFourWasteCollection?access_token=" + data['token'])
						.then(response => response.json())
						.then(parsedJson => {
							if(parsedJson['error'] ){
								console.log("Error de conexión");
							}else{
								if(parsedJson.data[0].bucket.wasteCollections){
									wasteCollections = parsedJson.data[0].bucket.wasteCollections;
								}
							}
						});

		var filter ='?filter={"include": [{"community":{"commune":{"providers":"provider"}}},{"bucket":"wasteCollections"}]}&';
		var RequestCommunity = fetch('https://api-conciencity.herokuapp.com/api/Residences/' + data['id'] + filter + '&access_token=' + data['token'])
						.then(response => response.json())
						.then(parsedJson => {
							if(parsedJson['error'] ){
								console.log("Error de conexión FILTER",parsedJson['error']);
							}else{
								console.log("COMUNIDAD:_ ",parsedJson);
								userData['name'] = parsedJson['name'];
								userData['username'] = parsedJson['username'];
								userData['commune'] = parsedJson['community']['commune']['name'];
								userData['community'] = parsedJson['community']['name'];
								userData['address'] = "Casa " + parsedJson['floor'];
								userData['landfill'] = parsedJson['community']['commune']['providers'][0]['provider']['name'];

								userData['dateCollection'] = parsedJson['community']['dateCollection'];
								userData['totalCollection'] = {'weight':'300 kg','number':8};
								console.log(userData);
							}
						});
		
		
		Promise.all([requestWasteCollection, RequestCommunity])
				 .then((results) => {
						console.log("Llamadas realizadas correctamente")
						var userData=this.state.userData;
						userData['username'] = data['username'];
				    this.setState({
						  wasteCollection: wasteCollections,
						  userData:userData,
						  load: false
						});
					});
	}


	componentDidUpdate(){
		window.$('.tooltipped').tooltip({delay:40,html:true});
	}


	constructor(props){
		super(props);
		this.state = {
			wasteCollection: [
			],
			userData:{
				name: 						'Residente',
				username: 				'Residente',
				commune:	 				'El Bosque',
				community: 				'Los manantiales',
				address: 					'Depto 32',
				landfill: 				'Santa Marta',
				dateCollection: 		'10 de marzo 14:00',
				totalCollection:	{'weight':'300 kg','number':8}
			},
			load: true
		}
	}
	render(){
		var load = this.state.load;
		if(load){

			return(
					<div className="center">
					<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
					<div className="preloader-wrapper big active">
					   <div className="spinner-layer spinner-green-only">
					     <div className="circle-clipper left">
					       <div className="circle"></div>
					     </div><div className="gap-patch">
					       <div className="circle"></div>
					     </div><div className="circle-clipper right">
					       <div className="circle"></div>
					     </div>
					   </div>
					 </div>
					 </div>

				)

		}else{
			const wasteCollection = this.state.wasteCollection;
			var userData = this.state.userData;
			var data = [];
			var labels = [];
			
			// Ordena el json para ser compatible con el grafico
			for (var i = 0; i < wasteCollection.length; i++) {
				var register = wasteCollection[i];
				var date = moment(register['collectedAt']);
				labels.push(date.format("D MMM") );
				data.push(register['weight']);
				wasteCollection[i]['collectedAt'] = date.format("dddd D MMMM HH:mm A") 
			};
			
			var data2=[];
			var labels2=[];
			for (var i = 0; i < 40; i++) {
				data2.push(Math.random()*100);
				labels2.push('día '+ i.toString());
				
			}

			moment.locale('en'); 
			var date = moment(this.state.userData.dateCollection,"dddd HH:mm").locale("es");
			moment.locale('es'); 
			var today = moment();    
			var diff= date.diff(today,'days');

			

			return(
				<Row>

					<Col id="alert" s={12} m={12}>
						<Card className="yellow darken-3" style={{'color':'white'}}> 
							<Row>
								<Col className="center-align" s={12} m={11}>
									Tu proxima recolección es en <span className="bold"> {diff} días </span> . Esta se realizará el día
									<span className="bold"> {date.format('LLLL')} </span>.
								</Col>
								<Col className="right-align" s={12} m={1}>
									<div className="right-align close-botton"> 
										<Button floating className='red' waves='light' icon='close' 
											onClick={() => { 
													window.$( "#alert" ).fadeOut( "slow", function() {
												});
											}}
										/>	
									</div>
								</Col>
							</Row>						
						</Card>
					</Col>




						<Col s={12}>
							
							<Parallax className="mt-3 white-text"
					            blur={4}
					            bgImage={window.location.origin + '/img/panoramica2.jpg'} 
					            strength={180}>
										<Row className="center-align">
											<Col  s="12">
											<br/>
												<h5> Bienvenido, residente de la vivienda  </h5>
												<h6> {userData.address}, comunidad {userData.community}, comuna {userData.commune} </h6>
												<br/> 	<br/>
											</Col>
											<Col s={3} offset="s1"> 
												<img  alt="piggy-bank"  height="150" src= {window.location.origin + '/img/piggy-bank.png'} /> 
											</Col>
											<Col s={5} offset="s1">
												La municipalidad de <span className="bold"> {userData.commune} </span> se ahorró <span className="bold">$830 pesos</span>  en el último mes de <span className="bold">Enero</span>, ya que reciclaste <span className="bold">4 kg </span> de residuos orgánicos y se evito que se los llevarán al relleno sanitario <span className="bold">{userData.landfill} </span>  ubicado en <span className="bold"> San Bernanrdo. </span>										
											</Col>
											

										</Row>
										


					    		</Parallax>
			    				<br/>
			    				<br/>
						</Col>
						<Col s={12} style={{'height': '500px'}}> 
							<Tabs className=' light-green darken-1 z-depth-1'>
								<Tab title="Últimas recolecciones" active>
									<Row>
										<Col s={12}>
											<br/> <br/> <br/>
										</Col>
										<Col m={6}>
											<BarChart data={data} labels={labels} color='green' />
										</Col>
										<Col m={6}>
											<WasteBox data={wasteCollection} />
										</Col>
									</Row>
								</Tab>
								<Tab title="Residuos hitoricos" >
									<Row>
										<Col s={12}>
											<br/> <br/> <br/>
										</Col>
										<Col m={8}>
											<LineChart data={data2} labels={labels2} color="clear" tag="Kilos" >  </LineChart>
										</Col>
										<Col m={4}> 
											<br/> <br/>
											Desde tu primera recolección ya llevas <span className="bold">{this.state.userData.totalCollection.weight} </span> 
											de residuos orgánicos reciclados. <br/>
											Hasta el momento se han realizado  <span className="bold">{this.state.userData.totalCollection.number} </span> 
											recolecciones en tu domicilio. 
										</Col>
									</Row>
								</Tab>
							</Tabs>
						
						
						</Col>
						
						
					</Row>
				);
		}
	}
}
export default Home;

import React, {Component } from 'react';
import BarChart from '.././BarChart';
import LineChart from '.././LineChart';
import WasteBox from '.././WasteBox';
import {Parallax} from 'react-parallax';
import moment from 'moment';
import 'moment/locale/es' ;
import { Row, Col, Tab, Tabs, Button, Icon, Card } from 'react-materialize';

class Home extends Component{

	componentDidMount(){

		
		//var elems = document.querySelectorAll('.tooltipped');
		//var instances = window.M.Tooltip.init(elems,{});
		

		var data = JSON.parse(sessionStorage.getItem('getData'));
		var wasteCollections = [];
		var userData=this.state.userData;

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
								wasteCollections = parsedJson['bucket']['wasteCollections'];
								console.log(userData);
							}
						});
		
		
		Promise.all([RequestCommunity])
				 .then((results) => {
						console.log("Llamadas realizadas correctamente")
						var userData=this.state.userData;
						userData['username'] = data['username'];
				    this.setState({
						  wasteCollections:wasteCollections,
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
			wasteCollections: [],
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
			var wasteCollections = JSON.parse(JSON.stringify(this.state.wasteCollections));
			var lastCollections = JSON.parse(JSON.stringify(wasteCollections.slice(0,4)));
			var userData = this.state.userData;
			var data = [];
			var labels = [];
			
			// Ordena el json para ser compatible con el grafico
			for (var i = 0; i < lastCollections.length; i++) {
				var register = lastCollections[i];
				var date = moment(register['created']);
				labels.push(date.format("D MMM") );
				data.push(register['weight']);
				//lastCollections[i]['created'] = date.format("dddd D MMMM HH:mm A") 
			};


			//Obtiene el tiempo faltante para la recoleccion
			moment.locale('en'); 
			var date = moment(this.state.userData.dateCollection,"dddd HH:mm").locale("es");
			moment.locale('es'); 
			var today = moment();    
			var diff= date.diff(today,'days');

			//Data historica
			var dataHistory = [];
			var labelsHistory=[];
			var totalWeight = 0;
			var totalCollections = 0;
			for (var i = 0; i < wasteCollections.length; i++) {
				var register = wasteCollections[i];
				var dates = moment(register['created']);
				labelsHistory.push(dates.format("D MMM") );
				dataHistory.push(register['weight']);
				
				totalWeight+= register['weight'];
				totalCollections+=1;
				wasteCollections[i]['created'] = dates.format("dddd D MMMM HH:mm A") 
			};
			var daysNextCollection;
			if(diff>1){
				daysNextCollection = "en"+ diff.toString() + " días";
			}else if(diff==1){
				daysNextCollection = "mañana!";
			}else{
				daysNextCollection = "hoy!";
			}
			

			return(
				<Row>
						<Col s={12}> <br/>  </Col>
						<Col s={8}>
							
							<Parallax className="white-text"
					            blur={4}
					            bgImage={window.location.origin + '/img/panoramica2.jpg'} 
					            strength={180}>
										<Row className="center-align">
											<Col  s="12">
											<br/>
												<h5> Bienvenido, residente de la vivienda  </h5>
												<h6> {userData.address}, comunidad {userData.community}, comuna {userData.commune} </h6>
												<br/>
											</Col>
											<Col s={3} offset="s1"> 
												<img  alt="piggy-bank"  height="150" src= {window.location.origin + '/img/piggy-bank.png'} /> 
											</Col>
											<Col s={5} offset="s1">
												<br/>
												La municipalidad de <span className="bold"> {userData.commune} </span> se ahorró <span className="bold">$830 pesos</span>  en el último mes de <span className="bold">Enero</span>, ya que reciclaste <span className="bold">4 kg </span> de residuos orgánicos y se evito que se los llevarán al relleno sanitario <span className="bold">{userData.landfill} </span>  ubicado en <span className="bold"> San Bernanrdo. </span>										
											</Col>
										</Row>
					    		</Parallax>
						</Col>
						
						<Col s={4}>
											<Card className="white-text light-green darken-3">
												<Row>
													
													<Col s={12} className="medium-text2 center-align" > Tu proxima recolección es <br/>  <br/> </Col>
													<Col s={3} offset="s1"> 
														<img  alt="waste-collector"  height="60" src= {window.location.origin + '/img/waste-collector.png'} /> 
													</Col>
										
													<Col s={6} offset="s1" className="hight-text"> {daysNextCollection} <br/>  </Col>
													<Col s={12} className="medium-text center-align" >Esta se realizara el día <br/>  <br/> </Col>
													

													<Col s={2}> 
														<img  alt="waste-collector"  height="50" src= {window.location.origin + '/img/calendar.png'} /> 
													</Col>
										
													<Col s={10}  className="hight-text center-align"> {date.calendar()} <br/>  </Col>
												</Row>
											</Card>
						</Col>

						<Col s={12} style={{'height': '500px'}}> 
							<br/> <br/>
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
											<WasteBox data={lastCollections} />
										</Col>
									</Row>
								</Tab>
								<Tab title="Residuos hitoricos" >
									<Row>
										<Col s={12}>
											<br/> <br/> <br/>
										</Col>
										<Col m={8}>
											<LineChart data={dataHistory} labels={labelsHistory} color="clear" tag="Kilos" >  </LineChart>
										</Col>
										<Col m={4}> 
											<br/> <br/>
											<div className="hight-text">
											Desde tu primera recolección ya llevas <span className="bold">{totalWeight} </span> kilos
											de residuos orgánicos reciclados. <br/>
											Hasta el momento se han realizado  <span className="bold">{totalCollections} </span> 
											recolecciones en tu domicilio.
											 </div>
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

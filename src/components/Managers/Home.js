import React, {Component } from 'react';
import moment from 'moment';
import 'moment/locale/es' 
import {Table,CardPanel,Card,Button,Row,Col} from 'react-materialize';
import LineChart from '.././LineChart';
import {HorizontalBar} from 'react-chartjs-2';


class Home extends Component{

	changeMount(i){
		var Data = this.state.Data;
		var dataSet = this.state.dataSet; 
		
		var title = ["1 mes","3 meses","6 meses"];
		var bool2 = this.state.switch;
		if(bool2){
			dataSet.datasets[0].data = JSON.parse(JSON.stringify(Data[i+3]));
			dataSet.datasets[0].label="Huella de Carbono";
			this.setState({dataSet:dataSet,ChartTittle:title[i],ChartTittle0:"Huella de Carbono"});
		}else{
			dataSet.datasets[0].data = JSON.parse(JSON.stringify(Data[i]));
			dataSet.datasets[0].label="Kilos de Residuos";
			this.setState({dataSet:dataSet,ChartTittle:title[i],ChartTittle0:"Residuos"});
		}
		
	}

	switch(){
		var bool = !this.state.switch;
		var title = this.state.ChartTittle;


		this.setState({
		    'switch':bool
		}, () => {
			//Change mount after setState
		    if(title=="1 mes"){
				this.changeMount(0);
			}else if(title=="3 meses"){
				this.changeMount(1);
			}else{
				this.changeMount(2);
			};
		});
		
		

	}

	componentDidMount(){
			

			moment.locale('es'); 

			/*Redirecciona en caso de necesitarlo:  */
			var dataSesion = JSON.parse(sessionStorage.getItem('getData'));
			if(dataSesion){

				var totalRequest = fetch("https://api-conciencity.herokuapp.com/api/Managers/" + dataSesion['id'] + "/community/totalWaste?access_token=" + dataSesion['token'])
					.then(response2 => response2.json())
					.then(parsedJson2 => {
						if(parsedJson2['error'] ){
							console.log("Error de conexión wasteCollection: ",parsedJson2['error']);
						}else{
							this.setState({
							  wasteCollection: parsedJson2
							}); 

					
						}
					});
					

				//3 llamadas 1 por mes, otra por 3 meses y otra por 6 meses, en un futuro arreglarlo y hacerlo escalable
				var mount = ["1","3","6"];
				var Data = [[],[],[]];
				var Labels = [];
				var recyclerName="";
				var promised = [];
				var humidityData = {	
					data:[],
					labels: []
				};

				function call(index,mou){
					return(fetch("https://api-conciencity.herokuapp.com/api/Managers/" + dataSesion['id'] + "/community/wasteByFloor/"+ mou +"?access_token=" + dataSesion['token'])
										.then(response => response.json())
										.then(parsedJson => {
											if(parsedJson['error'] ){
												console.log("Error de conexión: flootCollection",parsedJson['error']);
											}else{
												var data = [];
												var labels = [];
												
												if(parsedJson.length>0){
													//Agregar nombre reciclador:
													recyclerName = "Reciclador";
												}

												// Ordenamos data para el grafico de barra horizontal
												for (var j = 0;j < parsedJson.length; j++) {
													var register = parsedJson[j];
													labels.push("Piso " + register['floor']);
													data.push(parseInt(register['totalWeights']));
												}
												Data[index]   = data;
												if(labels.length > Labels.length){
													Labels = labels;
												}
												
											}
										})
					);
				}

				//Realiza una llamada por cada rango de mes y guarda los valores en una variable:
				 for (var i = 0; i < 3; i++) {
					var m = mount[i];
					var promise = call(i,m);
					promised.push(promise);
				}
		 
			var composterRequest = fetch("https://api-conciencity.herokuapp.com/api/Managers/" + dataSesion['id'] + "/community/statusComposter?access_token=" + dataSesion['token'])
			.then(response => response.json())
			.then(parsedJson => {
				if(parsedJson['error'] ){
					console.log("Error de conexión: Composter",parsedJson['error']);
				}else{
					for (var i = 0; i < parsedJson.length; i++) {
						var measure = parsedJson[i];
						humidityData.data.push(measure.value*100);
						var date = moment(measure.created);
						humidityData.labels.push(date.format('LT'));
					}
				}
			})

			promised.push(composterRequest);

			Promise.all(promised)
				 .then((results) => {
				   console.log("Llamadas realizadas correctamente")

				   var dataSet = this.state.dataSet;
				   dataSet.labels = Labels;
				   dataSet.datasets[0].data = Data[1];

				   //Huella de carbono:
				   for (var i = 0; i < 3; i++) {
				   		var dataRecycler = [];
				   		for (var j = 0; j < Data[i].length; j++){
				   			dataRecycler.push(Data[i][j]/2)
				   		}
				   		Data.push(dataRecycler);
				   }

				   var perfectHumidity =[];
				   for (var i = 0; i < humidityData['data'].length; i++) {
				   		perfectHumidity.push(80);
				   }
				   humidityData['perfectHumidity'] = perfectHumidity;


				   this.setState({
						Data:Data,
						dataSet: dataSet,
						load:false,
						recyclerName:recyclerName,
						humidityData: humidityData

					});
				});



			}else{
				this.props.history.push('/');
			}

	}
	constructor(props){
		super(props);
		var GreenBackgroundColor = [
		         '#b9f6ca',
		         '#b9f6ca',
		         '#b9f6ca',
		         '#b9f6ca'
		     ];
		 var greenBorderColor = [
		     'rgba(75, 192, 192, 1)',
		     'rgba(75, 192, 192, 1)',
		     'rgba(75, 192, 192, 1)',
		     'rgba(75, 192, 192, 1)'
		];
		var options = {
				        scales: {
				            yAxes: [{
				                ticks: {
				                    beginAtZero:true
				                }
										}],
										xAxes: [{
											ticks: {
													beginAtZero:true
											}
									}]
				        }
				    };
		this.state = {
			load: true,
			username: 'Edificio I',
			recyclerName: "",
			wasteCollection: {},
			Data: [],
			dataSet: {
		        labels: [],
		        datasets: [{
		            label: 'Kilos de Residuos',
		            data: [],
		            backgroundColor: GreenBackgroundColor ,
		            borderColor : greenBorderColor,
		            borderWidth: 1
		       		}]
		    	},
		    options: options,
			ChartTittle: "3 meses",
			ChartTittle0: "Residuos",
			switch: false,
			humidityData:{}
		}

		var links = ['Instructives','Home'];
		for(var i = 0; i < links.length; i++) {
			window.$("#" + links[i]).removeClass('active');
		}
		var path = window.location.pathname.split('/');
		window.$("#" + path[path.length-1]).addClass('active');
	}

	render(){


		var wasteCollection  = this.state.wasteCollection;
		var username  = this.state.username;
		var load = this.state.load;

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
			var labels = [];
			var data=[];
			for (var i = 3; i > -1; i--) {
				var register = wasteCollection[i];
				if(register){
					if(register['date']){
						var date = moment(register['date']);

						labels.push(date.format('D MMM'));
					}else{
						//Colocar laf fecha anterior desde una semana 
						labels.push("day");
					}
					if(register['total']){
						data.push(register['total']);
					}else{
						data.push(0);
					}				
				}

				
			};
			
			return(		
					<div>
						<Row className="">
							  <Col s={6} m={4} >
							        <CardPanel className="box300 wave-card-1">
							            <Row>
							            	<Col m={3} s={1} xl={3}>
							            		<img src= {window.location.origin + '/img/separation.png'}  className="responsive-img"/>
							            	</Col>
							            	<Col m={8} s={10}>
							            		<h5> ultimas 4 recolecciones </h5>
							            	</Col>
							            	<Col s={12}>
							            		<LineChart data={data} labels={labels} tag="Kilos" height={200} />
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
							            		<h5> Informacion recolector </h5>
							            		
							            	</Col>

							            	<Col s={12} m={12}>
							            		<Table>
												  <tbody>
												    <tr>
												      <td className="bold">Nombre recolector</td>
												      <td> {this.state.recyclerName} </td>
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
							            		<h5> Estado compostera </h5>
							            	</Col>
							            	<Col s={12} m={12}>
							            		<LineChart color="blue" height={240} data={this.state.humidityData.data} labels={this.state.humidityData.labels} tag="% Humedad "/>
							            	</Col>
							            </Row>
							        </CardPanel>
							  </Col>
							  <Col s={12} m={8} offset="m2" >
							 		 <Card>
							 		 	<h6 className="bold center"> {this.state.ChartTittle0} por piso: {this.state.ChartTittle} </h6>

							 		 	<Button onClick = {(event) => {this.changeMount(0)}} class="waves-effect waves-light "> 
									  			1 Mes 
									  	</Button><Button onClick = {(event) => {this.changeMount(1)}} class="waves-effect waves-light "> 
									  			3 Meses 
									  	</Button>
									  	<Button onClick = {(event) => {this.changeMount(2)}} class="waves-effect waves-light "> 
									  			6 Meses 
									  	</Button>
							 		 	<HorizontalBar width={500} height={200}  data={this.state.dataSet} options={this.state.options} />					 
								  		<Row>	
											<div class="switch" onChange={() => this.switch()}>
											    <label>
											      Residuos
											      <input type="checkbox"/>
											      <span class="lever"></span>
											      Huella de Carbono
											    </label>
											  </div>
								  		</Row>
							  		</Card>
							  </Col>


						</Row>


					</div>
			);
		}


	}

}


export default Home;
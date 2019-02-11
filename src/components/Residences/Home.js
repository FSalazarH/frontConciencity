import React, {Component } from 'react';
import BarChart from '.././BarChart';
import WasteBox from '.././WasteBox';
import {Preloader, Parallax} from 'react-parallax';

import Popper from '@material-ui/core/Popper';
import moment from 'moment';
import 'moment/locale/es' ;

class Home extends Component{

	componentDidMount(){

		
		//var elems = document.querySelectorAll('.tooltipped');
		//var instances = window.M.Tooltip.init(elems,{});

		var data = JSON.parse(sessionStorage.getItem('getData'));
		var wasteCollections = []
		var requestWasteCollection = fetch("https://api-conciencity.herokuapp.com/api/Residences/" + data['id'] + "/LastWasteCollection?access_token=" + data['token'])
						.then(response => response.json())
						.then(parsedJson => {
							if(parsedJson['error'] ){
								console.log("Error de conexión");
							}else{
								console.log("for heeere");
								console.log(parsedJson);
								if(parsedJson.data[0].wasteCollections){
									wasteCollections = parsedJson.data[0].wasteCollections;
								}
							}
						});

		Promise.all([requestWasteCollection])
				 .then((results) => {
				    console.log("Llamadas realizadas correctamente")
				    this.setState({
						  wasteCollection: wasteCollections,
						  username: data['username'],
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
			username: "Residente",
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
			var username = this.state.username;
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
			var context,context2;
			console.log(wasteCollection);
			return(
				<div className="row">
						<div className = "col s12">
							<Parallax className="mt-3 white-text"
					            blur={4}
					            bgImage={window.location.origin + '/img/panoramica.jpg'} 
					            strength={180}>
								<div className="min-height-100">
					                  
									<div className="row center mt-2">
										<div className="col s5 mt-3 ml-2">
											<h5> Bienvenido Residente   <br/> este mes has aportado </h5>
											 <br/>  <br/>  
											<h6 className="bold"> Proxima recolección:  Viernes 13:00  hrs  </h6> 	

										</div>


										<div className="col s6 mt-5">
											<div className="row">
												<div className="col s4 tooltipped pulse" 
													data-tooltip= {"Felicidades <span  class='bold' >" + username +  "</span > has ayudado a que 40kg  <br/> de residuos hayan sido utilizados correctamente!" } >
													 <img alt="20px"  width="90" src= {window.location.origin + '/img/RECYCLE-BIN.png'}  className="responsive-img"/>
													 <h5 className="bold"> 40 kg </h5>
												</div>
												<div className="col s2 mt-2">
											 		<i className="medium material-icons">arrow_forward</i>
											 	</div>

											 	<div className="col s4 tooltipped" 
											 		data-tooltip="La huella de Carbono corresponde a una medida de los gases
											 				<br/> de Dioxido de Carbono o CO2 que son liberados al planeta.
											 				<br/> La basura produce CO2, asi es que es una buena medida 
											 				<br/> del aporte ambiental producido por el compostaje. "
											 	> 
													 <img alt="20px"  width="90" src= {window.location.origin + '/img/HUELLA.png'}  className="responsive-img"/>
													 
													 <h5 className="bold"> 20 e kg </h5>
												</div>
											 </div>
					
										</div>		

									</div>


					    			</div>
					    		</Parallax>
			    				<br/>
			    				<br/>
						</div>

						<div className="col m12">
							<p class="flow-text"> Ultimas 4 recolecciones</p>
							<br/> <br/> <br/>
						</div>

						<div className = "col s12 m6">
							<BarChart data={data} labels={labels} color='green' />
						</div>
						<div className = "col s12 m6">		
							<WasteBox data={wasteCollection} />
						</div>
						
					</div>
				);
		}
	}
}
export default Home;

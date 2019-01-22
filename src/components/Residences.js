import React, {Component } from 'react';
import BarChart from './BarChart';
import Navigation from './Navigation';
import WasteBox from './WasteBox';
import {Preloader, Parallax} from 'react-parallax';
import Popper from '@material-ui/core/Popper';
import moment from 'moment';
import 'moment/locale/es' 




class Residences extends Component{

	componentDidMount(){


		/*Redirecciona en caso de necesitarlo:  */
		var data = JSON.parse(sessionStorage.getItem('getData'));
		
		if(data){

			fetch("https://api-conciencity.herokuapp.com/api/Residences/" + data['id'] + "?access_token=" + data['token'])
			.then(response => response.json())
			.then(parsedJson => {
				if(parsedJson['error'] ){
					this.props.history.push('/');
				}else{

					if(data){

						fetch("https://api-conciencity.herokuapp.com/api/Residences/" + data['id'] + "/getLastWasteCollection?access_token=" + data['token'])
						.then(response2 => response2.json())
						.then(parsedJson2 => {
							if(parsedJson['error'] ){
								console.log("Error de conexión");
							}else{
								console.log("for heeere");
								console.log(parsedJson2);
								this.setState({
								  wasteCollection: parsedJson2['data'][0]['bucket']['wasteCollections'],
								  username: data['username'],
								  load: false
								});
								console.log("for heeere2",this.state);
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
			wasteCollection: [
			],
			username: "Residente",
			load: true
		}
	}

	render(){
		const wasteCollection = this.state.wasteCollection;
		var username = this.state.username;
		var data = [];
		var labels = [];
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
						<div>
							<Navigation name={username}/>
							<div className="container">

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
															<div className="col s4">
																 <img alt="20px"  width="90" src= {window.location.origin + '/img/RECYCLE-BIN.png'}  className="responsive-img"/>
																 <h5 className="bold"> 40 kg </h5>
															</div>
															<div className="col s2 mt-2">
														 		<i className="medium material-icons">arrow_forward</i>
														 	</div>
														 	<div className="col s4 tooltipped" data-tooltip="I am a tooltip"> 
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

								


							</div>
						</div>

					)

		}


		
	}
}



export default Residences;
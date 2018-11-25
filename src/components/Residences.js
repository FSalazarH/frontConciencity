import React, {Component } from 'react';
import BarChart from './BarChart';
import Navigation from './Navigation';
import WasteBox from './WasteBox';
import {Preloader, Parallax} from 'react-parallax';


class Residences extends Component{

	componentDidMount(){


		/*Redirecciona en caso de necesitarlo:  */
		var data = JSON.parse(sessionStorage.getItem('getData'));
		
		if(data){
			fetch("http://localhost:3000/api/Residences/" + data['id'] + "?access_token=" + data['token'])
			.then(response => response.json())
			.then(parsedJson => {
				if(parsedJson['error'] ){
					this.props.history.push('/');
				}else{

					if(data){

						fetch("http://localhost:3000/api/Residences/" + data['id'] + "/getLastWasteCollection?access_token=" + data['token'])
						.then(response2 => response2.json())
						.then(parsedJson2 => {
							if(parsedJson['error'] ){
								console.log("Error de conexión");
							}else{
								console.log("for heeere");
								console.log(parsedJson2);
								this.setState({
								  wasteCollection: parsedJson2['data'][0]['bucket']['wasteCollections']
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
			]
		}
	}

	render(){
		const wasteCollection = this.state.wasteCollection;
		var data = [];
		var labels = [];


		// Ordena el json para ser compatible con el grafico
		for (var i = 0; i < wasteCollection.length; i++) {
			var register = wasteCollection[i];
			var date = new Date(register['collectedAt']); 
 			var elapsed = date.getDate() + "/ " + date.getMonth();
			labels.push(elapsed);
			data.push(register['weight']);
		};
		var context,context2;

		console.log("here",wasteCollection.length);
		if(wasteCollection.length>0){
			context = <div className = "col s12 m6">
						<BarChart data={data} labels={labels} color='green' />
					  </div>
			context2 = <div className = "col s12 m6">		
						<WasteBox data={wasteCollection} />
					</div>
		}else{
			context = 	<div className = "col m3 s12 offset-m3">
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

			context2 = 	<div className = "col m3 s12 offset-m3">
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
		}

		return(
			<div>
				<Navigation/>
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
											 	<div className="col s4">
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


						{context}
						{context2}	


						
					</div>
				</div>
			</div>

		)
	}
}



export default Residences;
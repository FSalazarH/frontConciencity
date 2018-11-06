import React, {Component } from 'react';
import BarChart from './BarChart';
import Navigation from './Navigation';
import WasteBox from './WasteBox';


class Chart extends Component{

	constructor(props){
		super(props);
		this.state = {
			wasteCollection: [
				{
					day: "Oct 26",
					hours: " 19:17:10",
					weight: 30,
					recyclerName: "Pedrito Tomatito"
				},
				{
					day: "Oct 19",
					hours: " 19:17:10",
					weight: 22,
					recyclerName: "Pedrito Tomatito"
				},
				{
					day: "Oct 12",
					hours: " 19:17:10",
					weight: 25,
					recyclerName: "Pedrito Tomatito"
				},
				{
					day: "Oct 5",
					hours: " 19:17:10",
					weight: 28,
					recyclerName: "Pedrito Tomatito"
				}

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
			labels.push(register['day']);
			data.push(register['weight']);
		};

		return(
			<div>
				<Navigation/>
				<div className="container">
					<div className="row">
						<div className = "col s12">
							<div className="card gradient-45deg-red-pink gradient-shadow min-height-100">
			                    
								<div className="row center mt-2">
									<div className="col s5 mt-3 ml-2">
										<h5> Bienvenido Juanito!   <br/> este mes has aportado </h5>

									</div>

									<div className="col s6 mt-5">
										<div className="row">
											<div className="col s3">
												 <i className="medium material-icons background-round"> free_breakfast </i>
											</div>
											<div className="col s3">
										 		<i className="medium material-icons background-round">arrow_forward</i>
										 	</div>
										 	<div className="col s3">
											 	<i className="medium material-icons background-round">fingerprint</i>
											 </div>
											 <div className="col s2 mt-3">
											 	<h6> 40 ekg </h6>
											 </div>
										 </div>
		
									</div>
									<div className="col s12 left-align ml-5">
										<h6> Proxima recolección:  Viernes 9 de Noviembre  </h6> 	
									</div>				

								</div>


                  			</div>
                  			<br/>
                  			<br/>
						</div>
						<div className = "col s6">
							<BarChart data={data} labels={labels} />
						</div>
						<div className = "col s6">
							<WasteBox data={wasteCollection} />
						</div>
					</div>
				</div>
			</div>

		)
	}
}



export default Chart;
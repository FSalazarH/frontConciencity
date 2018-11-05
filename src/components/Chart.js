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
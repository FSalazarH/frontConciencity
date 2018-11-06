import {Bar} from 'react-chartjs-2';
import React, {Component } from 'react';



class BarChart extends Component{

	constructor(props){
		super(props);
		this.state = {
			dataSet: {
		        labels: this.props.labels,
		        datasets: [{
		            label: 'Kilos de Residuos',
		            data: this.props.data,
		            backgroundColor: [
		                '#b9f6ca',
		                '#b9f6ca',
		                '#b9f6ca',
		                '#b9f6ca'
		            ],
		            borderColor: [
		                'rgba(75, 192, 192, 1)',
		                'rgba(75, 192, 192, 1)',
		                'rgba(75, 192, 192, 1)',
		                'rgba(75, 192, 192, 1)'
		            ],
		            borderWidth: 1
		        }]

		    },
		     options: {
				        scales: {
				            yAxes: [{
				                ticks: {
				                    beginAtZero:true
				                }
				            }]
				        }
				    }

			
		}
	}





	render(){

		var dataSet = this.state.dataSet;
		var options = this.state.options;

		return(	
			<div>

				<Bar data={dataSet} options={options}/>
				
			</div>
		)
	}
}



export default BarChart;
import {Bar,HorizontalBar} from 'react-chartjs-2';
import React, {Component } from 'react';
import {Table,CardTitle	,SideNav,Icon,Tab, Tabs,CardPanel,Card,Button,Collection,Row,Col,CollectionItem} from 'react-materialize';




class BarChart extends Component{
	constructor(props){
		super(props);
		var color = this.props.color;
		var backgroundColor,borderColor;
		if (color=='green'){
			backgroundColor = [
		                '#b9f6ca',
		                '#b9f6ca',
		                '#b9f6ca',
		                '#b9f6ca'
		            ];
		    borderColor = [
		        'rgba(75, 192, 192, 1)',
		        'rgba(75, 192, 192, 1)',
		        'rgba(75, 192, 192, 1)',
		        'rgba(75, 192, 192, 1)'
		    ];
		}else{
			backgroundColor = [
			            '#8cc0ee',
			            '#8cc0ee',
			            '#8cc0ee',
			            '#8cc0ee'
			        ];
			borderColor = [
			    'rgba(75, 192, 192, 1)',
			    'rgba(75, 192, 192, 1)',
			    'rgba(75, 192, 192, 1)',
			    'rgba(75, 192, 192, 1)'
			];
		};

		this.state = {
			dataSet: {
		        labels: this.props.labels,
		        datasets: [{
		            label: 'Kilos de Residuos',
		            data: this.props.data,
		            backgroundColor: backgroundColor ,
		            borderColor : borderColor,
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


		var options = this.state.options;


		if(this.props.type){
			return(	
				<div>

					<HorizontalBar width={500} height={200}  data={this.state.dataSet} options={options}/>					
				</div>
			)

		}else{
			return(	
				<div>

					<Bar data={this.state.dataSet} redraw={true} options={options}/>

				</div>
			)
		}



		
	}
}



export default BarChart;
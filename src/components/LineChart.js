import {Line} from 'react-chartjs-2';
import React, {Component } from 'react';



class LineChart extends Component{

render(){


		const data= {
        labels: ["January", "February", "March", "April"],
        datasets: [{
        label: "Residuos",
        backgroundColor: '#c0ec88',
        borderColor: '#57a25e',
        lineTension: 0,
        data: [20, 15, 30, 20],
        }]
    }

		return(	
			<div>
				<Line data={data} />
				
			</div>
		)
	}
}



export default LineChart;
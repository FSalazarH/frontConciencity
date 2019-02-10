import {Line} from 'react-chartjs-2';
import React, {Component } from 'react';



class LineChart extends Component{

render(){

        var backgroundColor = '#c0ec88';
        var borderColor: '#57a25e';

        if(this.props.color == 'blue'){
            backgroundColor =  '#40c4ff';
            borderColor = "#01579b";
        }


		const data= {
        labels: this.props.labels,
        datasets: [{
        label: this.props.tag,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        lineTension: 0,
        data: this.props.data,
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
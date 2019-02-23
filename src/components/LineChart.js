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
      var show=false;
      var title="";
      if(this.props.title){
        title=this.props.title;
        show=true;
      }

        var options= {
            responsive: true,
            title: {
              display: show,
              text: title
            },
            annotation: {
              annotations: [{
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: 80,
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 4,
                label: {
                  enabled: false,
                  content: 'Test label'
                }
              }]
            }
          }
    
      if(this.props.height){
        return(	
          <div>
            <Line data={data} options={options} height={this.props.height} />
            
          </div>
        )
      }else{
        return(	
          <div>
            <Line data={data} options={options} />
            
          </div>
        )
      }
		
	}
}



export default LineChart;
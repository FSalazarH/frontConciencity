import React, {Component } from 'react';
import {Tabs, Tab} from 'react-materialize';
import moment from 'moment';
import 'moment/locale/es' ;

class WasteBox extends Component{
	render(){
		var data= this.props.data;
		const listItems = data.map((element,i) => {
			var elapsed = moment(element.created);

			
			return(							
				<Tab title={ elapsed.format("D MMM") } active={i===0} >

				    	<div className="card">
				    		<table>
						        <thead>
						          <tr>
						              <th> </th>
						              <th> </th>
						          </tr>
						        </thead>

						        <tbody>
						          <tr>
						            <td>Fecha:</td>
						            <td>  {elapsed.format("dddd D MMMM HH:mm ") }  </td>
						          </tr>
						          <tr>
						            <td>Cantidad de residuos:</td>
						            <td> {element.weight} kilos </td>
						          </tr>
						          <tr>
						            <td>Nombre Reciclador: </td>
						            <td> Reciclador </td>
						          </tr>
						           <tr>
						            <td>Ahorro estimado: </td>
						            <td>{element.weight*2} e kg </td>
						          </tr>
						        </tbody>
						      </table>
				    	</div>

				    </Tab>


				)		
		})


		for(var i=0;i<data.lenght;i++){
			console.log(data[i]);

			};


		return(

			
				
							
				<Tabs className='teal green z-depth-1'>
				    {listItems}
				</Tabs>
	)
		
	}
}


export default WasteBox;

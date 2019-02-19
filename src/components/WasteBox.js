import React, {Component } from 'react';
import {Tabs, Tab} from 'react-materialize';

class WasteBox extends Component{
	render(){
		var data= this.props.data;
		const listItems = data.map((element,i) => {
			
			var date = element.collectedAt.split(" ");
 			var elapsed = date[1] + " " + date[2].slice(0, 3);
			return(							
				<Tab title={ elapsed } active={i==0} >

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
						            <td>  {element.collectedAt}  </td>
						          </tr>
						          <tr>
						            <td>Cantidad de residuos:</td>
						            <td> {element.weight} kilos </td>
						          </tr>
						          <tr>
						            <td>Nombre Reciclado: </td>
						            <td> Reciclador </td>
						          </tr>
						           <tr>
						            <td>Aporte ambiental estimado: </td>
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

import React, {Component } from 'react';
import {Button, Dropdown,Row,Col,Icon, Modal} from 'react-materialize';


class  Notification extends Component{


	render(){
		var notifications = this.props.data;
		var num = notifications.length;
		const collection = notifications.map((element,i) => {
			return(

				   		<li className="collection-item white-text red lighten-2">

				   			<div className="row">
				   				<div className="col s2">
				   					 <img src= {window.location.origin + '/img/red.png'} height="40" />
				   				</div>
				   				<div className="col s8">
				   					<span className="title white-text bold"> Alerta!, Humedad baja </span>
				   					<p> 
				   					   La humedad de la compostera es demaciado baja
				   					   Recomendamos regar inmediatamente! 
				   					</p>
							   </div>
							   <div className="col s2">
							   			<a href="#" className="white-text" 
							   				onClick={() => { 
							   					window.$('#foo').modal('open');
											}}>
							   					<i className="material-icons"> check_box </i>

							   			</a>
							   </div>
							</div>


					    </li>



				)		
		});

		return(


			<div>
			   <Dropdown   className="box400 ml-2" options={{belowOrigin: true}} trigger={
			   		<span className="avatar-status mr-2" >
			   		  <img  style={{'background':' #e3e302'}} src= {window.location.origin + '/img/bell2.png'} class="circle responsive-img"/> 
			   			<small style={{'top': '-30px'}} class="notification-badge"> {num}  </small>
			   		</span>
			   	}>
			   		<ul class="collection">
			   			{collection}
			   		</ul>
			   	</Dropdown>

			   	<Modal

			   		id="foo"
				    header='Confirmar que la alerta fue resuelta' 
				    actions={
				    		<div>
					    	 	 <Button className="  green darken-1  modal-close"> Confirmar </Button>
					    	 	 	 &emsp;  &emsp;
					    		 <Button className="  red darken-1 modal-close"> Cancelar </Button>
					    		 </div>

					  }  >
				    Un buen compostaje requiere que todas las variables se encuentren en un estado optimo. <br/>
				    ¿Desea indicar que la alerta ha sido resuelta?
				    <br/>
				    <br/>
				    <br/>
				    <br/>

					  

				</Modal>
			</div>


		)
	}
}



export default Notification;
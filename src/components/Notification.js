import React, {Component } from 'react';
import {Button, Dropdown,Row,Col,Icon, Modal} from 'react-materialize';


class  Notification extends Component{

	constructor(props){
		super(props);
		this.onChange = this.onChange.bind(this);
		this.state = {
			id: "",
			num: 0,
			notifications: this.props.data
		};
	}

	onChange(val,i,e) {
		this.setState({'id':val,'num':i});
 	 }
	
	handleClick(event) {
		var data = JSON.parse(sessionStorage.getItem('getData'));
		var id = this.state.id;
		var num = this.state.num;


		var notifications = this.state.notifications;
		console.log(num,id,notifications);

		fetch("https://api-conciencity.herokuapp.com/api//Recyclers/" + data['id'] + "/notifications/" + id + "?access_token=" + data['token'],
			{
			    method: "PUT",
			    body: JSON.stringify({"solve": true}),
			     headers:{
				    'Content-Type': 'application/json'
				  }
			}
		).then(response => response.json())
		.then(parsedJson => {
			if(parsedJson['error']){
				console.log(parsedJson);
				window.Materialize.toast('Lo sentimos :c, a ocurrido un error!', 1500, 'red');
			}else{
				notifications.splice(num,1);
				this.setState({'notifications':notifications });
				window.Materialize.toast('Alerta confirmada como resuelta!', 1000, 'red');
			}
			
		})
		.catch(error => window.Materialize.toast('Error al intentar conectar con el servidor.', 1500, 'red') );
		
	}





	render(){
		var notifications = this.state.notifications;
		var num = notifications.length;
		const collection = notifications.map((element,i) => {
			console.log(element);
			var modalData = {};

			if(element.code == 1){
				modalData['title'] = "Alerta!, Humedad baja";
				modalData['description'] = "La humedad de la compostera es demaciado baja  Recomendamos regar inmediatamente! ";
				modalData['image'] = "'/img/red.png'";
			}else if(element.code == 2){
				modalData['title'] = "Alerta!, Humedad alta";
				modalData['description'] = "La humedad de la compostera es demaciado alta  Recomendamos airear la compostera y filtrar algo de agua";
				modalData['image'] = "'/img/blue.png'";
			}

			return(

				   		<li className="collection-item white-text red lighten-2">

				   			<div className="row">
				   				<div className="col s2">
				   					 <img src= {window.location.origin + modalData['image']} height="40" />
				   				</div>
				   				<div className="col s8">
				   					<span className="title white-text bold"> {modalData['title']} </span>
				   					<p> 
				   					   {modalData['description']}
				   					</p>
							   </div>
							   <div className="col s2">
							   			<a href="#" className="white-text" 
							   				onClick={() => { 
							   					window.$('#foo').modal('open');
							   					this.onChange(element.id,i);
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
					    	 	 <Button onClick={(event) => { 
					    	 	 			this.handleClick(event);
											}} 
										className="green darken-1  modal-close"> Confirmar </Button>
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
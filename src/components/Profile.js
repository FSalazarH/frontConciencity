import React, {Component } from 'react';
import {Input,Card,Button,Row,Col,Icon} from 'react-materialize';
import FormModal from './Conciencity/FormModal';

class forms extends Component{

	handleClick(){
		var forms = this.state.forms;
		var data = JSON.parse(sessionStorage.getItem('getData'));
		var url="https://api-conciencity.herokuapp.com/api/" + data.usertype  + "/" + forms.id;

		fetch(url + "?access_token=" + data['token'],
				{
					method: 'PATCH',
					dataType: 'json',
					headers:{
						'Access-Control-Allow-Origin':'*',
						'Content-Type': 'application/json'
						},
					body: JSON.stringify(forms)
				}
			).then(response => response.json())			
			.then(parsedJson => {
				if(parsedJson['error'] ){
					window.Materialize.toast('Ups!, lo sentimos ha ocurrido un error.', 1000, 'red');
				}else{
					window.Materialize.toast('Perfil editado correctamente.', 1000, 'red');
				}
			});

	}

    componentDidMount(){

        //fetch para obtener datos:
		var data = JSON.parse(sessionStorage.getItem('getData'));
		var forms = {};
		var requestSession = fetch("https://api-conciencity.herokuapp.com/api/" + data['usertype'] + "/" + data['id'] + "?access_token=" + data['token'])
						.then(response => response.json())
						.then(parsedJson => {
							if(parsedJson['error'] ){
								console.log("Error de conexión");
							}else{
								if(parsedJson){
									forms = parsedJson;
								}
							}
						});

		Promise.all([requestSession])
				 .then((results) => {
				    console.log("Llamadas realizadas correctamente")
				    this.setState({
						  forms: forms,
						  load: true
						});
                    });
	}

    constructor(props){
        super(props);
		this.state = {
			forms:{},
			load: false,
			disabled:true
        }
	}

	render(){
		var dict = {'floor':'Piso','number':'Numero','rut':'Rut','name':'Nombre','username':'Nombre de Usuario','email':'Correo Electronico'};
		var notEditable=['floor','number'];
		var forms=this.state.forms;
		const listItems = Object.keys(forms).map((element,i) => {
			if(dict[element]){
				if(notEditable.indexOf(element) >= 0){
					return(
						<Input  disabled s={6} label={dict[element]} 
									  defaultValue={forms[element]} 
								  /> 
					)
				}else{
					return(
						<Input  disabled={this.state.disabled} s={6} label={dict[element]} 
									onChange = {(event,newValue) => {
		
											// Se utiliza una funcion onChange para que react guarde las modificaciones
											  forms[element] = newValue;
											  this.setState({forms:forms });
											  }	
										  } 
									  defaultValue={forms[element]} 
								  /> 
		
					)
				}
				
			}
			
		});

		var formPassword = {"oldPassword":"","newPassword":"","repeatPassword":""}
		var dataSesion = JSON.parse(sessionStorage.getItem('getData'));
       
		return (
			<div>
				<Row>
					
					<Col s={12}>  
						<br/>
					
					</Col>

					<Col s={1} offset="s11" className="align-right">    
						<Button floating large className='blue' waves='light' icon='edit' 
							onClick={() => { 
								var dis = this.state.disabled;
								this.setState({'disabled':!dis});
							 }}
						/>	
					</Col>
					<Col s={4}>
						<img  src= {window.location.origin + '/img/user.png'}  className="responsive-img"/> 
					</Col>
					<Col s={8}>
						<Card>
							<Row>
								{listItems}
								
							 	<Col s={4} offset="s8"> 
							 		<br/>
								 	<Button className="light-green darken-4"  
									 	onClick={() => { 
											this.handleClick()
										 }}
									 
									 > Guardar </Button>
								 </Col>
								
							</Row>			
						</Card>
						
						
					</Col>

					

					<Col s={8} offset="s4">
										 <Card className="center-align">
											 <Button className="orange darken-1"  
									 	onClick={() => { 
											window.$('#FormModalPassword').modal('open');
										 }}
									 
									 > <Icon> lock </Icon>  Cambiar contraseña </Button>
										 </Card>
										
					<FormModal forms={formPassword} label={"FormModalPassword"} method={{'type':'POST','http': dataSesion.usertype + '/change-password'}} />

					</Col>
				</Row>
				
				
			</div> 
			)
	}
}
export default forms;

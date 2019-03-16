import React, {Component } from 'react';
import {Input,Modal,Button,Row} from 'react-materialize';


class FormModal extends Component{
	componentWillMount(){

	}

	handleClick(event) {

		var data = JSON.parse(sessionStorage.getItem('getData'));
		if(data){
	
				var forms = JSON.parse(JSON.stringify(this.state.forms));
				var send = true;

				//En caso de tener contrasena:
				if(forms['newPassword']){
					if(forms['newPassword'] !== forms['repeatPassword']) {
						window.Materialize.toast('Las contrasenas no coinciden', 4000, 'yellow');
						send=false;
					}else if(forms['newPassword'] === " " || forms['newPassword'] === "" ){
						window.Materialize.toast('contrasena invalida', 4000, 'yellow');
						send=false;
					}else{
						delete forms["repeatPassword"];
					}
				}

				if(send){
					//Aqui se rescata el formulario y se envia 
					var method = this.state.method; 
					var select = this.state.select;
					if(select){
						var defaul = forms[select]['default'];
						forms[select] = defaul;

					}
					var url="https://api-conciencity.herokuapp.com/api/" + method['http'];
					if(method['type'] == "PATCH"){
						url=url+"/" + forms.id;
					}

					fetch(url + "?access_token=" + data['token'],
							{
									method: method['type'],
									dataType: 'json',
							    headers:{
										'Access-Control-Allow-Methods':'*',
								    'Content-Type': 'application/json'
									},
									body: JSON.stringify(forms)
							}
						).then(response => {
							console.log("RESPONSE: ",response);
							if(response.status == 204){
								window.Materialize.toast('Contraseña cambiada correctamente!', 4000, 'blue');
							}

							return(response.json());
						}
						).then(parsedJson => {
							console.log("HERE", parsedJson);
							if(parsedJson['error']){
								if(parsedJson['error']['message'] == 'Invalid current password' ){
									window.Materialize.toast('Contraseña invalida!, porfavor ingrese su contraseña actual correctamente.', 5000, 'yellow');
								}else{
									window.Materialize.toast('Lo sentimos :c, a ocurrido un error!', 4000, 'yellow');
								}
								
							}else{
								console.log('creadooo',parsedJson);
								var functions=this.props.function;
								if(functions){
									functions(parsedJson);
								} 
								window.Materialize.toast('Datos guardados correctamente', 4000, 'blue');
							}	
						})
					}
				}
				
		}


	constructor(props){
		super(props);
		this.state = {
			label	:this.props.label,
			forms 	:this.props.forms,
			method  :this.props.method,
			select: null
		}
		
	}

	render(){
		var label = this.state.label;
		var forms = this.state.forms;
		var select = null;

		var dict = {'oldPassword':'Contraseña Actual','newPassword':'Contraseña','repeatPassword':'Repita contraseña', 'name':'Nombre','location':'Localización'
					,'id':'id', 'address':'Dirección', 'image':'Url imagen', 'dateCollection':'Día de recolección','communeId':'Comuna','floorsQuantity':'Cantidad de pisos',
					'rut':'Rut','number':'Número','floor':'Piso','email':'Correo electronico','communityId':'Comunidad','state':'Estado','assignedAt':'Fecha de asignación',
					'type':'Tipo','capacity':'Capacidad','residenceId':'Residente asociado'
		};

		// Se mapea el json de formulario y se construye un input por cada uno.

		var listForm = Object.keys(forms).map((element,i) => {

			//Curso de accion para string:
			if(typeof forms[element] != "object" || typeof forms[element] == "array"){
				var type="";
				var range=6;
				if(element=="newPassword" || element=="repeatPassword"){
					type = "password";
				}else if(element== "email"){
					type="email";
				}else if(element=="oldPassword"){
					type = "password";
					range=12;
				}

				

				if(element=="id" ){
						return(<Input s={6} label={element} defaultValue={forms[element]} disabled />);
				}else{
					return( 
						<Input s={range} label={dict[element]} 
							onChange = {(event,newValue) => {

									// Se utiliza una funcion onChange para que react guarde las modificaciones
							  		forms[element] = newValue;
							  		this.setState({forms:forms });
							  		}	
							  	} 
					  		validate type={type} 
					  		defaultValue={forms[element]} 
					  	/> 
					);
				}

			//Curso de accion para lista:
			}else{
				if(forms[element]['options']){
					//En caso de que este options es un forms select
					var list= forms[element]['options'];
					select = element;  // para mas elementos convertir select en una lista

					return(

						<Input s={12} type='select' label={dict[element]} 
							onChange = {(event,newValue) => {
									// Se utiliza una funcion onChange para que react guarde las modificaciones
							  		forms[element]['default'] = newValue;
							  		this.setState({forms:forms });
							  		}	
							  	} 
							defaultValue={forms[element]['default']}>
								{list.map(function(object, j){
							        return <option value={forms[element]['id'][j]}> {object} </option>;
							    })} 
						</Input>
						);
				}else{
					//En caso de que este sea una lista con elementos, actualmente son solo location:

					//location x
					var m1 = <Input s={6} label={dict[element] + ' X'} 
							onChange = {(event,newValue) => {

									// Se utiliza una funcion onChange para que react guarde las modificaciones
							  		forms[element][0] = newValue;
							  		this.setState({forms:forms});
							  		}	
							  	} 
					  		validate type={type} 
					  		defaultValue={forms[element][0]} 
					  	/> 

					 //location y
					var m2 = <Input s={6} label={dict[element] + ' Y'} 
							onChange = {(event,newValue) => {

									// Se utiliza una funcion onChange para que react guarde las modificaciones
							  		forms[element][1] = newValue;
							  		this.setState({forms:forms });
							  		}	
							  	} 
					  		validate type={type} 
					  		defaultValue={forms[element][1]} 
					  	/> 

					return( <div>  {m1} {m2} </div>);
				}	
			}
			this.setState({'select':select});
		});

		

		return(
				<Modal
			   		id={label}
				    header='Formulario Usuario' 
				    actions={
				    		<div>
					    	 	 <Button onClick={(event) => { 
					    	 	 			this.handleClick(event);
											}} 
										className="green darken-1  modal-close"> Guardar </Button>
					    	 	 	 &emsp;  &emsp;
					    		 <Button className="red darken-1 modal-close"> Cancelar </Button>
					    		 </div>

					  }  >
				  		<Row>
				  		   {listForm}

						  	

				  		</Row>   
					  

				</Modal>
			)
	}
}

export default FormModal;
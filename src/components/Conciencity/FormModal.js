import React, {Component } from 'react';
import {Table,CardTitle,Input,SideNav,Icon,Tab, Modal,Tabs,CardPanel,Card,Button,Collection,Row,Col,CollectionItem} from 'react-materialize';


class FormModal extends Component{
	componentWillMount(){

	}

	handleClick(event) {


		var data = JSON.parse(sessionStorage.getItem('getData')); 
		if(data){
	
				var forms = this.state.forms;
				var send = true;

				//En caso de tener contrasena:
				if(forms['password']){
					if(forms['password'] != forms['repeat password']) {
						window.Materialize.toast('Las contrasenas no coinciden', 1000, 'red');
						send=false;
					}else if(forms['password'] == " " || forms['password'] == "" ){
						window.Materialize.toast('contrasena invalida', 1000, 'red');
						send=false;
					}else{
						delete forms["repeat password"];
					}
				}

				if(send){
					//Aqui se rescata el formulario y se envia 
					var method = this.state.method; 
					var select = this.state.select;
					if(select){
						console.log(select);
						var defaul = forms[select]['default'];
						forms[select] = defaul;

					}

					fetch("https://api-conciencity.herokuapp.com/api/" + method['http'] + "?access_token=" + data['token'],
							{
							    method: method['type'],
							    body: JSON.stringify(forms),
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

								//notifications.splice(num,1);
								//this.setState({'notifications':notifications });
								window.Materialize.toast('Elemento creada correctamente', 1000, 'red');
							}	
						})
						.catch(error => window.Materialize.toast('Error al intentar conectar con el servidor.', 1500, 'red') );
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

		// Se mapea el json de formulario y se construye un input por cada uno.

		var listForm = Object.keys(forms).map((element,i) => {

			//Curso de accion para string:
			if(typeof forms[element] != "object" || typeof forms[element] == "array"){
				var type="";
				if(element=="password" || element=="repeat password"){
					type = "password";
				}else if(element== "email"){
					type="email";
				}

				if(element=="id" ){
						return(<Input s={6} label={element} defaultValue={forms[element]} disabled />);
				}else{
					return( 
						<Input s={6} label={element} 
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

						<Input s={12} type='select' label={element} 
							onChange = {(event,newValue) => {

									// Se utiliza una funcion onChange para que react guarde las modificaciones
							  		forms[element]['default'] = newValue;
							  		console.log(newValue);
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
					var m1 = <Input s={6} label={element + ' X'} 
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
					var m2 = <Input s={6} label={element + ' Y'} 
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
import React, {Component } from 'react';
import {Table,CardTitle,Input,SideNav,Icon,Tab, Modal,Tabs,CardPanel,Card,Button,Collection,Row,Col,CollectionItem} from 'react-materialize';

class forms extends Component{

    componentDidMount(){

        //fetch para obtener datos:
		var data = JSON.parse(sessionStorage.getItem('getData'));
		var forms = {};
		console.log("FOR HERE",data)
		var requestSession = fetch("https://api-conciencity.herokuapp.com/api/" + data['usertype'] + "/" + data['id'] + "?access_token=" + data['token'])
						.then(response => response.json())
						.then(parsedJson => {
							if(parsedJson['error'] ){
								console.log("Error de conexión");
							}else{
								console.log("AQUI",parsedJson);
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
			load: false
        }
	}

	render(){
		var dict = {'floor':'Piso','number':'Numero','rut':'Rut','name':'Nombre','username':'Nombre de Usuario','email':'Correo Electronico'};
		var forms=this.state.forms;
		const listItems = Object.keys(forms).map((element,i) => {
			if(dict[element]){
				return(
					<Input style={{'color':'black'}} disabled s={6} label={dict[element]} 
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
			
		});

       
		return (
			<div>
				<Row>
					<Col s={12}> <br/> <br/> <br/>  </Col>
					<Col s={4}>
						<img  src= {window.location.origin + '/img/user.png'}  className="responsive-img"/> 
					</Col>
					<Col s={8}>
						<Card>
							<Row>
								{listItems}
							</Row>
						</Card>
					</Col>
				</Row>
				
				
			</div> 
			)
	}
}
export default forms;

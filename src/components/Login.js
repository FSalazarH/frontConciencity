import React, {Component } from 'react';
import {Row,Icon,Input} from 'react-materialize';
import { Parallax} from 'react-parallax';

class Login extends Component{
	
	constructor(props){
		super(props);
		this.onChange = this.onChange.bind(this);
		this.state = {
			password: "",
			username: "",
			usertype: "Residences"
		}


		/*Redirecciona en caso de necesitarlo:  */
		var data = JSON.parse(sessionStorage.getItem('getData'));
		console.log(data);
		
		if(data){
			fetch("https://api-conciencity.herokuapp.com/api/" + data['usertype'] +"/" + data['id'] + "?access_token=" + data['token'])
			.then(response => response.json())
			.then(parsedJson => {
				if(parsedJson['error'] ){
					console.log("error",parsedJson['error']);
				}else{
					this.props.history.push('/' + data['usertype']  + '/home');
				}
			});
		}
	}

	onChange(e) {
		this.setState({'usertype':e.target.value});
 	 }

	handleClick(event) {
		var usertype= this.state.usertype;
		console.log(this.state);

		fetch("https://api-conciencity.herokuapp.com/api/" + usertype + "/login?[include]=user",
			{
			    method: "POST",
			    body: JSON.stringify(this.state),
			     headers:{
				    'Content-Type': 'application/json'
				  }
			}
		)
		.then(response => response.json())
		.then(parsedJson => {
			if(parsedJson['id']){
				console.log("logeado");
				var data={
					"token":parsedJson['id'],
					"id":parsedJson['userId'],
					"usertype":usertype,
					"username":this.state.username
				}
				sessionStorage.setItem('getData', JSON.stringify(data));


				this.props.history.push('/' + usertype);
			}else{
				console.log("no logeado?");
				window.Materialize.toast('Nombre de usuario o contraseña incorrecto!', 1000, 'red');


			}
			

			} 
		)
		.catch(error => window.Materialize.toast('Error al intentar conectar con el servidor.', 1500, 'red') );
		
	}

	render(){

		return(

			
           	<Parallax  className="back"
								            blur={8}
								            bgImage={"http://goplaceit.s3.amazonaws.com/proyectos/2b2d405b-7349-4e12-a28a-25806f98f23c.jpg"} 
								            strength={10}>



				<div style={{ height: '30px' }} />
		      		<div className="row">
		      		<div className="col m8 s12 offset-m2 center">
		      			<h4 className="bg-card bg-card-user">
		      				<br/>
		      				<img  src= {window.location.origin + '/img/logo-circle.jpg'} alt="20px"  width="120" className="circle responsive-img"/>

		      				    <div className="row">
		      				  	  <div className="col m8 s12 offset-m2 center">
									  <div className="row login-card card">
									  	<h4>Inicia sesión. </h4>
									    <form className="col s12">
									    	<Row>
									    		<Input s={12} type='select' label="Tipo de Usuario" onChange={this.onChange}  defaultValue='Residences'>
												    <option value='Residences'>  Residente </option>
												    <option value='Managers'> Administrador </option>
												    <option value='Recyclers'> Reciclador </option>
												     <option value='Conciencity'> Conciencity </option>

												</Input>
									         	<Input s={12} label="Nombre o Email" id="icon_prefix" type="text" value={this.state.username}  onChange = {(event,newValue) => this.setState({username:newValue})} >
									       			<Icon className="material-icons iconis prefix"> account_box </Icon>
									       	  	</Input>

		
									        	<Input s={12} label="Contraseña "id="password" type="password" value={this.state.password} onChange = {(event,newValue) => this.setState({password:newValue})} >
									          		<Icon className="material-icons iconis prefix"> lock </Icon>
									          	</Input>

		
									      	  	<div s={12} className="btn waves-effect waves-light" onClick={(event) => this.handleClick(event)}> Iniciar sesión! </div>
									      	</Row>

									    </form>
									    

									  </div>
									  <br/> <br/>
								  </div>
							    </div>


		      			</h4>
				   	  </div>
			    	</div>

			    	<div style={{'height':'500px'}}>
			    	</div>

			    	
			</Parallax>
		    
			)
		
	}
}


export default Login;
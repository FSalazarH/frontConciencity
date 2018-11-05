import React, {Component } from 'react';
import {Icon} from 'react-materialize';

class Login extends Component{
	render(){

		return(

			
		      	<div className="row">
		      		<div className="col m8 s8 offset-m2 offset-s2 center">
		      			<h4 className="bg-card-user">
		      				<img  src= {window.location.origin + '/img/user.png'} alt="20px"  width="120" className="circle responsive-img"/>

		      				  <div className="row">

		      				  	  <div className="col m8 s8 offset-m2 offset-s2 center">

								  <div className="row login-card card">
								  	<h4>Inicia sesión. </h4>
								    <form className="col s12">
								      <div className="row">
								         <div className="input-field col m12 s12">
								          <Icon className="material-icons iconis prefix"> account_box </Icon>
								          <input id="icon_prefix" type="text" className="validate"/>
								          <label for="icon_prefix">Nombre o Email</label>
								        </div>
								      </div>
								      <div className="row">
								        <div className="input-field col m12 s12">
								          <Icon className="material-icons iconis prefix"> lock </Icon>
								          <input id="password" type="password" className="validate"/>
								          <label for="password">Contraseña</label>
								        </div>
								      </div>
								      <div className="row">
								      	<button className="btn waves-effect waves-light" type="submit" name="action">Iniciar sesión!</button>
								      </div>
								    </form>
								  </div>

								  </div>
							    </div>


		      			</h4>
				   	  </div>
			    </div>
 

		    
			)
		
	}
}


export default Login;
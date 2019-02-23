import React, {Component } from 'react';
import {Navbar, Dropdown, NavItem} from 'react-materialize';
import {NavLink} from "react-router-dom";

class Navigation2 extends Component {
	render(){
	var data = JSON.parse(sessionStorage.getItem('getData'));
	return(



			<Navbar fixed={true} className="navbar-fixed-top hide-on-med-and-down wave-ocean-2" >
			 <NavItem> <img  width="180px" alt="logo-white" src= {window.location.origin + '/img/logo-white.png'}  className="responsive-img"/>  </NavItem>
			  <NavItem  href="#" className="right"> 
			  	<Dropdown  options={{belowOrigin: true,autoTrigger: true, hover: true}} trigger={
					  	<div className="bold nobreak">
					  				<span className="avatar-status mr-2" >
						             <img  alt="building" style={{'background':'#0d47a1'}} src= {window.location.origin + '/img/edificio.png'} class="circle responsive-img"/> 
					  			</span>
						  			<div className="md-1" style={{'display': 'inline-block'}}>
						  				 &emsp; {this.props.name}
						  				 &emsp;
						  			</div>
					  	</div>


				  }>
					  <NavLink to={"/"+data.usertype+"/Profile"}> <NavItem > Perfil </NavItem>  </NavLink>
					  <NavItem divider />
					  <NavItem  href="/Logout"> Cerrar Sesión </NavItem>
				</Dropdown> </NavItem>



			</Navbar>


		)
	}
}


export default Navigation2;

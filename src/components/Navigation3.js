import React, {Component } from 'react';
import {Navbar,Button, Dropdown,Row,Col, NavItem, Icon} from 'react-materialize';

class Navigation3 extends Component {
	render(){
	return(




			<Navbar fixed={true} style={{'height':'80px'}} className="navbar-fixed-top hide-on-med-and-down wave-green" >
			 <NavItem> <img  width="200px" src= {window.location.origin + '/img/logo-white.png'}  className="responsive-img"/>  </NavItem>
			 
			 <NavItem href="#" className="right z-depth-1" > 
			  	<Dropdown  options={{belowOrigin: true,autoTrigger: true, hover: true}} trigger={
			  					<div className="bold">
				  				<span className="avatar-status">
					              <img  style={{'background':'#11998e'}} src= {window.location.origin + '/img/USUARIO-RECOLECTOR.png'} class="circle responsive-img"/> 
					  			</span>
					  				Pedrito Tomatito
					  			</div>
				  }>
					  <NavItem> Perfil </NavItem>
					  <NavItem divider />
					  <NavItem  href="/Logout"> Cerrar Sesión </NavItem>
				</Dropdown>

			  </NavItem>



			</Navbar>


		)
	}
}


export default Navigation3;
import React, {Component } from 'react';
import {Navbar,Button, Dropdown,Row,Col, NavItem, Icon} from 'react-materialize';

class Navigation2 extends Component {
	render(){
	return(



			<Navbar fixed={true} className="navbar-fixed-top hide-on-med-and-down wave-ocean-2" >
			 <NavItem> <img  width="180px" src= {window.location.origin + '/img/logo-white.png'}  className="responsive-img"/>  </NavItem>
			  <NavItem  href="#" className="right"> 
			  	<Dropdown  options={{belowOrigin: true,autoTrigger: true, hover: true}} trigger={
					  	<div className="bold nobreak">
					  				<span className="avatar-status mr-2" >
						             <img  style={{'background':'#0d47a1'}} src= {window.location.origin + '/img/edificio.png'} class="circle responsive-img"/> 
					  			</span>
						  			<div className="md-1" style={{'display': 'inline-block'}}>
						  				 &emsp; {this.props.name}
						  				 &emsp;
						  			</div>
					  	</div>


				  }>
					  <NavItem> Perfil </NavItem>
					  <NavItem divider />
					  <NavItem  href="/Logout"> Cerrar Sesión </NavItem>
				</Dropdown> </NavItem>



			</Navbar>


		)
	}
}


export default Navigation2;

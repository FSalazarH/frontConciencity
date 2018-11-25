import React, {Component } from 'react';
import {Navbar,Button, Dropdown,Row,Col, NavItem, Icon} from 'react-materialize';

class Navigation extends Component {
	render(){
	return(



			<Navbar className="green darken-2 hide-on-med-and-down" >
			 <NavItem> <img  width="150px" src= {window.location.origin + '/img/logo-white.png'}  className="responsive-img"/>  </NavItem>
			  <NavItem href='get-started.html' className="active"> Inicio </NavItem>
			  <NavItem href='get-started.html'> Instructivos </NavItem>
			  <NavItem className="right"> 
			  	<Dropdown  options={{belowOrigin: true,autoTrigger: true, hover: true}} trigger={
			  			<Row>
				  			<Col s={4}>
				  				<span className="avatar-status">
					              <img src= {window.location.origin + '/img/residence.png'} class="circle responsive-img"/> 
					  			</span>
					  		</Col>
					  		<Col s={8}>
					  			Dpto 505
					  		</Col>
					  	</Row>
				  }>
					  <NavItem> Perfil </NavItem>
					  <NavItem divider />
					  <NavItem href="/Logout"> Cerrar Sesión </NavItem>
				</Dropdown> </NavItem>



			</Navbar>


		)
	}
}


export default Navigation;

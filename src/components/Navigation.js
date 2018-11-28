import React, {Component } from 'react';
import {Navbar,Button, Dropdown,Row,Col, NavItem, NavLink,Icon} from 'react-materialize';

class Navigation extends Component {
	render(){
		var act1 = "";
		var act2 = "";
		if(this.props.active=='InstrResident'){
				act2 = "active";
			}else{
				act1 = "active";
			}

		return(

			
			
			<Navbar className="wave-forest hide-on-med-and-down" >

			 <NavItem> <img  width="180px" src= {window.location.origin + '/img/logo-white.png'}  className="responsive-img"/>  </NavItem>
			  <NavItem href='Residences' className={act1}> Inicio </NavItem>
			  <NavItem href='InstrResident' className={act2} > Instructivos </NavItem>
			  <NavItem className="right"> 
			  	<Dropdown  options={{belowOrigin: true,autoTrigger: true, hover: true}} trigger={
			  			<Row>
				  			<Col s={4}>
				  				<span className="avatar-status">
					              <img src= {window.location.origin + '/img/residence.png'} class="circle responsive-img"/> 
					  			</span>
					  		</Col>
					  		<Col s={8}>
					  			&emsp; {this.props.name}
					  		</Col>
					  	</Row>
				  }>
					  <NavItem > Perfil </NavItem>
					  <NavItem divider />
					  <NavItem href="/Logout"> Cerrar Sesión </NavItem>
				</Dropdown> </NavItem>



			</Navbar>


			)
		}
}


export default Navigation;

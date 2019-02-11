import React, {Component } from 'react';
import {Navbar,Button, Dropdown,Row,Col, NavItem, Icon} from 'react-materialize';
import Notification from './Notification';

class Navigation3 extends Component {





	render(){
	return(




			<Navbar fixed={true} className="navbar-fixed-top hide-on-med-and-down wave-green" >
			 <NavItem> 
			 <img  width="200px" src= {window.location.origin + '/img/logo-white.png'}  className="responsive-img"/>  


			 </NavItem>
			 
			<div className="right">


			  

			 <NavItem > 
			 	<Notification data={this.props.notifications}/>

			  </NavItem>

			 <NavItem href="#"  > 
			  	<Dropdown options={{belowOrigin: true}} trigger={
			  					<div className="bold nobreak">
					  				<span className="avatar-status mr-2" >
						              <img  style={{'background':'#11998e'}} src= {window.location.origin + '/img/USUARIO-RECOLECTOR.png'} class="circle responsive-img"/> 
						  			</span>
						  			<div className="md-1" style={{'display': 'inline-block'}}>
						  			&emsp;
						  				{this.props.name} &emsp;
						  			</div>
					  			</div>
				  }>
					  <NavItem> Perfil </NavItem>
					  <NavItem divider />
					  <NavItem  href="/Logout"> Cerrar Sesión </NavItem>
				</Dropdown>

			  </NavItem>
			 </div>



			</Navbar>


		)
	}
}


export default Navigation3;
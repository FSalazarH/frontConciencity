import React, {Component } from 'react';
import {Navbar,Button, Dropdown,Row,Col, NavItem, Icon} from 'react-materialize';

class Navigation3 extends Component {





	render(){
	return(




			<Navbar fixed={true} className="navbar-fixed-top hide-on-med-and-down wave-green" >
			 <NavItem> 
			 <img  width="200px" src= {window.location.origin + '/img/logo-white.png'}  className="responsive-img"/>  


			 </NavItem>
			 
			<div className="right">


			 

			 <NavItem href="#"  > 
			  	<Dropdown options={{belowOrigin: true,autoTrigger: true, hover: true}} trigger={
					  				<span className="avatar-status mr-2" >
						              <img  style={{'background':' #e3e302'}} src= {window.location.origin + '/img/bell2.png'} class="circle responsive-img"/> 
										<small style={{'top': '-30px'}} class="notification-badge">2</small>
						  			</span>
				  }>
					   <ul class="collection">
					      <li class="collection-item">Alvin
					      	Notificación 1
					      </li>
					      <li class="collection-item">Alvin
					      	Notificación 2
					      </li>
					      <li class="collection-item">Alvin
					      	Notificación 3
					      </li>

					    </ul>
				</Dropdown>

			  </NavItem>

			 <NavItem href="#"  > 
			  	<Dropdown options={{belowOrigin: true,autoTrigger: true, hover: true}} trigger={
			  					<div className="bold nobreak">
					  				<span className="avatar-status mr-2" >
						              <img  style={{'background':'#11998e'}} src= {window.location.origin + '/img/USUARIO-RECOLECTOR.png'} class="circle responsive-img"/> 
						  			</span>
						  			<div className="md-1" style={{'display': 'inline-block'}}>
						  				{this.props.name}
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
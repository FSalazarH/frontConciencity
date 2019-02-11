import React, {Component } from 'react';
import {Navbar,Button, Dropdown,Row,Col, NavItem,Icon} from 'react-materialize';
import {NavLink} from 'react-router-dom';

class Navigation extends Component {

	changeactives(i){
		if(i==0){
			this.setState({act1:"active",act2:""});
		}else if(i==1){
			this.setState({act2:"active",act1:""});
		}
	}

	constructor(props){
		super(props);
		this.state = {
			act1:"active",
			act2:""
		}
	}

	render(){;

		return(

			
			
			<Navbar className="wave-forest hide-on-med-and-down" >

			 <NavItem> <img  width="180px" src= {window.location.origin + '/img/logo-white.png'}  className="responsive-img"/>  </NavItem>
			  
			  <NavLink to="/Residences/Home"  >
			  	<NavItem  className={this.state.act1} onClick = {(event) => {this.changeactives(0)}} > Inicio </NavItem>
			  </NavLink>

			  <NavLink to="/Residences/Instructives"  >
			  	<NavItem className={this.state.act2} onClick = {(event) => {this.changeactives(1)}} > Instructivos </NavItem>
			  </NavLink>
			  <NavItem className="right"> 
			  	<Dropdown  options={{belowOrigin: true,autoTrigger: true, hover: true}} trigger={

					  	<div className="bold nobreak">
					  				<span className="avatar-status mr-2" >
						              <img src= {window.location.origin + '/img/residence.png'} class="circle responsive-img"/> 
					  			</span>
						  			<div className="md-1" style={{'display': 'inline-block'}}>
						  				 &emsp; {this.props.name}
						  				 &emsp;
						  			</div>
					  	</div>
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

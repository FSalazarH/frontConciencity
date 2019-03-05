import React, {Component } from 'react';
import {Navbar, Dropdown, NavItem} from 'react-materialize';
import {NavLink} from 'react-router-dom';

class Navigation extends Component {

	changeactives(i){
		var navbar=this.state.navbar;
		for(var j = 0; j < navbar.length; j++) {
			navbar[j] = '';
		}
		navbar[i]='active';
		this.setState({'navbar':navbar});
	}

	constructor(props){
		super(props);
		this.state = {
			navbar:['active','','']
		}
		
	}

	render(){
		var data = JSON.parse(sessionStorage.getItem('getData'));
		return(

			<Navbar className="wave-forest hide-on-med-and-down" >

			 <NavItem> <img  width="180px" src= {window.location.origin + '/img/logo-white.png'}  className="responsive-img"/>  </NavItem>
			  
			  <NavLink to="/Residences/Home"  >
			  	<NavItem  className={this.state.navbar[0]} onClick = {(event) => {this.changeactives(0)}} > Inicio </NavItem>
			  </NavLink>

			  <NavLink to="/Residences/Instructives"  >
			  	<NavItem className={this.state.navbar[1]} onClick = {(event) => {this.changeactives(1)}} > Instructivos </NavItem>
			  </NavLink>
			  <NavLink  to={"/"+data.usertype+"/Profile"}>
			  	<NavItem className={this.state.navbar[2]} onClick = {(event) => {this.changeactives(2)}} > Perfil </NavItem>
			  </NavLink>

			  <NavItem className='right '> 
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
					  
					  	<NavLink  to={"/"+data.usertype+"/Profile"}>
							<NavItem  
								className={this.state.navbar[2]}
								onClick = {(event) => {this.changeactives(2)}}
					  		> Perfil 
							</NavItem>  
					  	</NavLink>
					  <NavItem divider />
					  <NavItem href="/Logout"> Cerrar Sesión </NavItem>
				</Dropdown> </NavItem>



			</Navbar>


			)
		}
}


export default Navigation;

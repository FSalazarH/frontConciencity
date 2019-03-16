import React, {Component } from 'react';
import {Navbar, Dropdown, NavItem} from 'react-materialize';
import {NavLink,Link} from 'react-router-dom';
import Icon from 'react-materialize/lib/Icon';
import Row from 'react-materialize/lib/Row';
import Col from 'react-materialize/lib/Col';

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

			 <NavItem > <img style={{'display':'block','padding-bottom':'10px'}} width="180px" src= {window.location.origin + '/img/logo-white.png'}  className="responsive-img"/>  
			 
			 </NavItem>
			  
			  <NavLink to="/Residences/Home"  >
			  	<NavItem  className={this.state.navbar[0]} onClick = {(event) => {this.changeactives(0)}} > Inicio </NavItem>
			  </NavLink>

			  <NavLink to="/Residences/Instructives"  >
			  	<NavItem className={this.state.navbar[1]} onClick = {(event) => {this.changeactives(1)}} > Instructivos </NavItem>
			  </NavLink>
			  <NavLink  to={"/"+data.usertype+"/Profile"}>
			  	<NavItem className={this.state.navbar[2]} onClick = {(event) => {this.changeactives(2)}} > Perfil </NavItem>
			  </NavLink>
			  
			  <a className='right'> 
			  	<Dropdown  options={{belowOrigin: true,autoTrigger: false, hover: false}} trigger={

					  	<div className="btn cyan darken-4 bold" >
						  	<Row>
								<Col s={4}>  <i className="material-icons avatar-status"> arrow_drop_down person</i>  </Col>
								<Col s={8}>  {this.props.name}  </Col>
							</Row> 
					  	</div>
				  }>
					  
					  	<Link onClick = {(event) => {this.changeactives(2)}}  to={"/"+data.usertype+"/Profile"} style={{'color':'#26a69a','height':'50px'}}>
							Perfil   
					  	</Link>
					  <NavItem divider />
					  <NavItem href="/Logout"> Cerrar Sesión </NavItem>
				</Dropdown> </a>



			</Navbar>


			)
		}
}


export default Navigation;

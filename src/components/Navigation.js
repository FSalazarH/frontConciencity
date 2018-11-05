import React, {Component } from 'react';


class Navigation extends Component {
	render(){
	return(
			 <nav>
			    <div className="nav-wrapper">
			      <a href="#!" className="brand-logo center">  </a>
			      <ul className="left hide-on-med-and-down">
			        <li><a href="about"> Inicio </a></li>
			        <li><a href="lista"> Instructivos </a></li>
			        <li className="active"> <a href="/"> Suguerencias </a> </li>
			      </ul>
			    </div>
			  </nav>


		)
	}
}


export default Navigation;

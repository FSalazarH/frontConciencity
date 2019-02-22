import React, {Component } from 'react';
import {Table,CardTitle,SideNav,Icon,Tab, Modal,Tabs,CardPanel,Card,Button,Collection,Row,Col,CollectionItem} from 'react-materialize';
import CRUD from '.././CRUD';
import {NavLink} from 'react-router-dom';


class Communities extends Component{

	componentWillMount(){

	}

	constructor(props){
		super(props);
		this.state = {
			load: true,
			name:this.props.match.params.name,
			id:this.props.match.params.id

		}
		var links = ['Buckets','Communes','Communities','Composters','Dispositives','Home','Managers','Recyclers','Residences'];
		for(var i = 0; i < links.length; i++) {
			window.$("#" + links[i]).removeClass('active');
		}
		var path = window.location.pathname.split('/');
		window.$("#" + path[path.length-1]).addClass('active');
		
	}



	render(){
		var forms = {
  					address: "",
  					communeId: "",
  					dateCollection: "",
  					floorsQuantity: 1,
  					image: "",
  					name: ""
				}
		// Dependencia de Communities, estas variables se usan para el request y la creación en el formulario del select.
		var http= '/Communes/' + this.state.id + '/Communities';
		var url={'get':http,'other':'/Communities','dependence':{'url':'/Communes','fk':'communeId','selectName':'name'} };
		console.log("AQUI",this.state.id);

		return(
			<div>
				 <nav className="blue darken-4">
					<div class="nav-wrapper">
						<div class="col s12">
							<NavLink to="/Conciencity/Home" >
								<a class="breadcrumb"> Comuna {this.state.name} </a>
							</NavLink>
							<a class="breadcrumb"> Comunidades</a>
						</div>
					</div>
				</nav>
				<CRUD url={url} forms ={forms} type="User" label="location_city"/>
			</div>
		)
	}

}

export default Communities;
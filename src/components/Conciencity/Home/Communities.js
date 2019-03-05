import React, {Component } from 'react';
import {Breadcrumb,MenuItem} from 'react-materialize';
import CRUD from '.././CRUD';
import {Link} from 'react-router-dom';


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

		return(
			<div>
				 <Breadcrumb className="blue darken-4">
					<MenuItem>
						<Link to="/Conciencity/Home" >
							<a class="breadcrumb"> Comunas </a> 	
						</Link>
					</MenuItem>
					<MenuItem>
						<Link to={"/Conciencity/Commune/" + this.state.id + "/" + this.state.name + "/Communities" }>
							<a class="breadcrumb"> {this.state.name} </a>
						</Link>
					</MenuItem>
				</Breadcrumb>
				<CRUD url={url} forms ={forms} content={{'title':'','http':['/Commune','/Communities'],'type':false}} label="location_city"/>
			</div>
		)
	}

}

export default Communities;
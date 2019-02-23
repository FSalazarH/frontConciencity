import React, {Component } from 'react';
import {Breadcrumb,MenuItem} from 'react-materialize';
import {Link} from 'react-router-dom';
import CRUD from '.././CRUD';

class Managers extends Component{

	componentWillMount(){

	}

	constructor(props){
		super(props);
		this.state = {
			load: true,
			name:this.props.match.params.name,
			id:this.props.match.params.id,
			name2:this.props.match.params.name2,
			id2:this.props.match.params.id2

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
  					email: "",
  					name: "",
  					rut: "",
  					username: "",
  					password: "",
  					"repeat password":""
                }

		// url de Residences, estas variables se usan para el request y la creación en el formulario del select. 
		var url={'get':'/Communities/' +this.state.id2 + '/Managers','other':'/Managers','dependence':{'url':'/Communities','fk':'communityId','selectName':'name'} };

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
					<MenuItem>
						Comunidad {this.state.name2}
					</MenuItem>
					<MenuItem>
						Administradores
					</MenuItem>
				</Breadcrumb>

                <CRUD url={url} type="User" forms ={forms} label="person"/>
            </div>
			
		)
	}

}

export default Managers;
import React, {Component } from 'react';
import {Breadcrumb,MenuItem} from 'react-materialize';
import {Link} from 'react-router-dom';
import CRUD from './CRUD';


class Home extends Component{
	constructor(props){
		super(props);
		this.state = {
			load: true,
			commune: [],
			delete: 0
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
			"name": "",
			"location": [0,0]
	  	}
		  var url={'get':'/Communes','other':'/Communes'};
		return(
			<div>		
				<Breadcrumb className="blue darken-4">
					<MenuItem>
						<Link to="/Conciencity/Home" >
							<a class="breadcrumb"> Comunas </a> 	
						</Link>
					</MenuItem>
				</Breadcrumb>
				<CRUD url={url} forms ={forms} label="place" content={{'title':'Comunidades','http':['/Commune','/Communities'],'type':true}} />
		
			</div>
		)


	}

}


export default Home;
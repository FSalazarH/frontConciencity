import React, {Component } from 'react';
import CRUD from './CRUD';

class Managers extends Component{

	componentWillMount(){

	}

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
				email: "",
				name: "",
				rut: "",
				username: "",
				password: "",
				"repeat password":""
		}
		// Dependencia de Managers, estas variables se usan para el request y la creación en el formulario del select. 
		var url={'get':'/Managers','other':'/Managers','dependence':{'url':'/Communities','fk':'communityId','selectName':'name'} };
		return(
			<CRUD url={url} forms ={forms} label="person"/>
		)
	}

}

export default Managers;
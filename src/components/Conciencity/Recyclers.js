import React, {Component } from 'react';
import CRUD from './CRUD';

class Recycles extends Component{

	componentWillMount(){
	}

	constructor(props){
		super(props);
		var links = ['Buckets','Communes','Communities','Composters','Dispositives','Home','Managers','Recyclers','Residences'];
		for(var i = 0; i < links.length; i++) {
			window.$("#" + links[i]).removeClass('active');
		}
		var path = window.location.pathname.split('/');
		window.$("#" + path[path.length-1]).addClass('active');
	}



	render(){
		var forms={
				email: "",
				name: "",
				rut: "",
				username: "",
				password: "",
				"repeat password":""
			}

			var url={'get':'/Recyclers','other':'/Recyclers' };

		return(
			<CRUD url={url} type="User" label="person" forms ={forms} />
			)
	}

}

export default Recycles;
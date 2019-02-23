import React, {Component } from 'react';
import CRUD from './CRUD';

class Communes extends Component{

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
  					"name": "",
  					"location": [0,0]
				}
		var url={'get':'/Communes','other':'/Communes'};

		return(
			<CRUD url={url} forms ={forms} label="place"/>
		)
	}

}

export default Communes;
import React, {Component } from 'react';
import {Table,CardTitle,SideNav,Icon,Tab, Modal,Tabs,CardPanel,Card,Button,Collection,Row,Col,CollectionItem} from 'react-materialize';

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

		return(
			<CRUD name="Recyclers" type="User" label="person" forms ={forms} />
			)
	}

}

export default Recycles;
import React, {Component } from 'react';
import {Table,CardTitle,SideNav,Icon,Tab, Modal,Tabs,CardPanel,Card,Button,Collection,Row,Col,CollectionItem} from 'react-materialize';

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
  					address: "",
  					communeId: "",
  					dateCollection: "",
  					floorsQuantity: 1,
  					image: "",
  					name: ""
				}
		// Dependencia de Managers, estas variables se usan para el request y la creación en el formulario del select. 
		var subname={"name":"Communities","fk":"communityId","selectName":"name"}
		return(
			<CRUD name="Managers" subname={subname} forms ={forms} label="person"/>
		)
	}

}

export default Managers;
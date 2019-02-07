import React, {Component } from 'react';
import {Table,CardTitle,SideNav,Icon,Tab, Modal,Tabs,CardPanel,Card,Button,Collection,Row,Col,CollectionItem} from 'react-materialize';

import CRUD from './CRUD';

class Buckets extends Component{

	componentWillMount(){

	}

	constructor(props){
		super(props);
		this.state = {
			load: true,
			commune: [],
			delete: 0
		}
		var links = ['composters','recyclers','residences','managers','community','home','commune','dispositives']
		for(var i = 0; i < links.length; i++) {
			window.$("#" + links[i]).removeClass('active');
		}
		window.$("#buckets").addClass('active');
	}



	render(){
		var forms = {
  					"capacity": 0
				}
		// Dependencia de Buckets, estas variables se usan para el request y la creación en el formulario del select. 
		var subname={"name":"Residences","fk":"residenceId","selectName":"username"}
		return(
			<CRUD name="Buckets" subname={subname} forms ={forms} label="local_drink"/>
		)
	}

}

export default Buckets;
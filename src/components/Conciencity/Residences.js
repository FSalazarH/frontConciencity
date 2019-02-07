import React, {Component } from 'react';
import {Table,CardTitle,SideNav,Icon,Tab, Modal,Tabs,CardPanel,Card,Button,Collection,Row,Col,CollectionItem} from 'react-materialize';

import CRUD from './CRUD';

class Residences extends Component{

	componentWillMount(){

	}

	constructor(props){
		super(props);
		this.state = {
			load: true,
			commune: [],
			delete: 0
		}
		var links = ['buckets','composters','recyclers','managers','community','home','commune','dispositives']
		for(var i = 0; i < links.length; i++) {
			window.$("#" + links[i]).removeClass('active');
		}
		window.$("#residences").addClass('active');
	}



	render(){
		var forms = {
  					email: "",
  					name: "",
  					rut: "",
  					username: "",
  					password: "",
  					floor: "1",
  					"number":"2",
  					"repeat password":""
				}
		// Dependencia de Residences, estas variables se usan para el request y la creación en el formulario del select. 
		var subname={"name":"Communities","fk":"communityId","selectName":"name"}
		return(
			<CRUD name="Residences" subname={subname} type="User" forms ={forms} label="person"/>
		)
	}

}

export default Residences;
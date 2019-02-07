import React, {Component } from 'react';
import {Table,CardTitle,SideNav,Icon,Tab, Modal,Tabs,CardPanel,Card,Button,Collection,Row,Col,CollectionItem} from 'react-materialize';

import CRUD from './CRUD';

class Recycles extends Component{

	componentWillMount(){
	}

	constructor(props){
		super(props);
		var links = ['buckets','composters','composters','buckets','managers','residences','commune','home','community','dispositives']
		for(var i = 0; i < links.length; i++) {
			window.$("#" + links[i]).removeClass('active');
		}
		window.$("#recyclers").addClass('active');
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
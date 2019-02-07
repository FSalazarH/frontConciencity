import React, {Component } from 'react';
import {Table,CardTitle,SideNav,Icon,Tab, Modal,Tabs,CardPanel,Card,Button,Collection,Row,Col,CollectionItem} from 'react-materialize';

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
		var links = ['buckets','composters','recyclers','managers','residences','home','community','dispositives']
		for(var i = 0; i < links.length; i++) {
			window.$("#" + links[i]).removeClass('active');
		}
		window.$("#commune").addClass('active');
	}



	render(){
		var forms = {
  					"name": "",
  					"location": [0,0]
				}
		return(
			<CRUD name="Communes" forms ={forms} label="place"/>
		)
	}

}

export default Communes;
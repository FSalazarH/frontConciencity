import React, {Component } from 'react';
import {Table,CardTitle,SideNav,Icon,Tab, Modal,Tabs,CardPanel,Card,Button,Collection,Row,Col,CollectionItem} from 'react-materialize';

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
				 <nav className="blue darken-4">
					<div class="nav-wrapper">
						<div class="col s12">
							<a href="#!" class="breadcrumb"> Comunas</a>
							
						</div>
					</div>
				</nav>		
				<CRUD url={url} forms ={forms} label="place" content={{'title':'Comunidades','http':['/Communes','/Communities']}} />
		
			</div>
		)


	}

}


export default Home;
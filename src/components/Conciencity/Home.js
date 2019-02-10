import React, {Component } from 'react';



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

		return(

				
				<div> Bienvenido usuario Coniencity</div>
		)



	}

}


export default Home;
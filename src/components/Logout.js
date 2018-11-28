import React, {Component } from 'react';

class Logout extends Component{


	render(){
		var data = JSON.parse(sessionStorage.getItem('getData'));
		if(data){
			fetch("http://localhost:3000/api/" + data['usertype'] +"/logout?access_token=" + data['token'],{
			    headers: {
			      'Accept': 'application/json',
			      'Content-Type': 'application/json'
			    },
			    method: "POST",
			    body: JSON.stringify({})
			})
			.then(response => {
				if(response['error']){
					console.log("error",response['error']);
				}else{
					console.log("Usuario cerro sesión");
					sessionStorage.removeItem('getData');
					console.log("pass 1");
					this.props.history.push('/');
					console.log("pass 2");
				}

			});
		}

		return null;
	}
		
}

export default Logout ;
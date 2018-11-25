import React, {Component } from 'react';

class Logout extends Component{


	render(){
		var data = JSON.parse(sessionStorage.getItem('getData'));
		if(data){
			fetch("http://localhost:3000/api/" + data['usertype'] +"/logout?access_token=" + data['token'])
			.then(response => response.json())
			.then(parsedJson => {
				if(parsedJson['error'] ){
					console.log("error",parsedJson['error']);
				}else{
					sessionStorage.removeItem('getData');
					this.props.history.push('/');
				}
			});
		}

		return null;
	}
		
}

export default Logout ;
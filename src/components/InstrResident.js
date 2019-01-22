import React, {Component } from 'react';
import Navigation from './Navigation';



class InstrResident extends Component{

	componentDidMount(){


		/*Redirecciona en caso de necesitarlo:  */
		var data = JSON.parse(sessionStorage.getItem('getData'));
		
		if(data){

			fetch("http://localhost:3000/api/Residences/" + data['id'] + "?access_token=" + data['token'])
			.then(response => response.json())
			.then(parsedJson => {
				if(parsedJson['error'] ){
					this.props.history.push('/');
				}else{
					this.setState({
					  username: data['username'],
					  load: false
					});
				}
			});
		}else{
			this.props.history.push('/');
		}
    }



	constructor(props){
		super(props);
		this.state = {
			wasteCollection: [
			],
			username: "Residente",
			load: true
		}
	}

	render(){
		var username = this.state.username;
		console.log("for heeere2",this.state);
		return(


			<div>

				<Navigation name={username} active="InstrResident" name={username}/>
				<div className="container center">
					<br/> <br/> <br/>
					<embed src={window.location.origin + '/residente.pdf'} width="800px" height="2100px" />

				</div>
			</div>
		)



	}

}


export default InstrResident;
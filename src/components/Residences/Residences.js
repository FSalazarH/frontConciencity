import React, {Component } from 'react';
import Navigation from '.././Navigation';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Home from './Home';
import Instructives from '../Managers/Instructives';
import Profile from '../Profile';


class Residences extends Component{

	componentDidMount(){


		/*Redirecciona en caso de necesitarlo:  */
		var data = JSON.parse(sessionStorage.getItem('getData'));
		
		if(data){

			fetch("https://api-conciencity.herokuapp.com/api/Residences/" + data['id'] + "?access_token=" + data['token'])
			.then(response => response.json())
			.then(parsedJson => {
				if(parsedJson['error'] ){
					this.props.history.push('/');
				}else{
					this.setState({username: data['username'],load:false});
				}
			});
		}else{
			this.props.history.push('/');
		}
  }

	constructor(props){
		super(props);
		this.state = {
			username: "Residente",
			load: true
		}
	}

	render(){
		var username = this.state.username;
		var load = this.state.load;





		if(load){

			return(
					<div className="center">
					<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
					<div className="preloader-wrapper big active">
					   <div className="spinner-layer spinner-green-only">
					     <div className="circle-clipper left">
					       <div className="circle"></div>
					     </div><div className="gap-patch">
					       <div className="circle"></div>
					     </div><div className="circle-clipper right">
					       <div className="circle"></div>
					     </div>
					   </div>
					 </div>
					 </div>

				)

		}else{

					

					return(
						<BrowserRouter>
							<div>
								<Navigation name={username}/>
								<div className="container">
										<div style={{width: 1000, margin: '0 auto'}}>
								          
								          <Switch>
								              <Route exact path='/Residences/Home' component={Home} />
								              <Route exact path='/Residences/Instructives' component={Instructives} />
															<Route exact path="/Residences/Profile" component={Profile} />
								          </Switch>
								        </div>
								</div>
							</div>
						</BrowserRouter>
					)

		}


		
	}
}



export default Residences;
import React, {Component } from 'react';
import axios from 'axios';


class Lista extends Component{

	constructor(){
		super();
		this.state = {
			list : []
		}
	}

	componentWillMount(){
		this.getList();
	}

	getList(){
		axios.get('http://localhost:3000/api/Communities')
			.then(response=> {
				this.setState({list: response.data}, () => {
					console.log(this.state);	
				})
			})
	}

	render(){
		const listItems = this.state.list.map((element,i) => {
			return(
				<li className="collection-item"> {element.name}  {element.address} </li> 
				)		
		})
		return (
			<div>
				<h2> Comunidades </h2>
				<ul className="collection">
					{listItems}
				</ul>

			</div> 
			)
	}
}
export default Lista;

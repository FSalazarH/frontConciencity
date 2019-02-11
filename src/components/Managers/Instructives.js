import React, {Component } from 'react';

class Instructives extends Component{

	constructor(props){
		super(props);
		var links = ['Instructives','Home'];
		for(var i = 0; i < links.length; i++) {
			window.$("#" + links[i]).removeClass('active');
		}
		var path = window.location.pathname.split('/');
		window.$("#" + path[path.length-1]).addClass('active');
	}

	render(){
		return(


			<div>
				<div className="container center">
					<br/> <br/> <br/>
					<embed src={window.location.origin + '/residente.pdf'} width="800px" height="2100px" />

				</div>
			</div>
		)



	}

}


export default Instructives;
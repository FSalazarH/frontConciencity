import React, {Component } from 'react';
import Navigation from './Navigation';

import {BrowserRouter,Router,Route, Link} from 'react-router-dom';
import subtest1 from './subtest1';
import subtest2 from './subtest2';

class Test extends Component{


	render(){

		return(
				<div>
					<div> hello </div>

					<BrowserRouter>
				        <div style={{width: 1000, margin: '0 auto'}}>
				          <ul>
				            <li><Link to='/public'> Public </Link></li>
				            <li><Link to='/private'> Private </Link></li>
				          </ul>

				          <hr/>

				          <Route path='/public' component={subtest1} />
				          <Route path='/private' component={subtest2} />
				        </div>
				     </BrowserRouter>
			     </div>
		)



	}

}


export default Test;
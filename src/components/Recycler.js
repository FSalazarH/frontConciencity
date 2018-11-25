import React, {Component } from 'react';
import Navigation3 from './Navigation3';
import {Table,CardTitle,SideNav,Icon,Tab, Tabs,CardPanel,Card,Button,Collection,Row,Col,CollectionItem} from 'react-materialize';
import LineChart from './LineChart';


class Recycler  extends Component{



	constructor(props){
		super(props);
		this.state = {
			load: false,
			wasteCollection: [
				{
					day: "Piso 1",
					weight: 30,
					recyclerName: "Pedrito Tomatito"
				},
				{
					day: "Piso 2",
					weight: 22,
					recyclerName: "Pedrito Tomatito"
				},
				{
					day: "Piso 3",
					weight: 25,
					recyclerName: "Pedrito Tomatito"
				}

			]
		}
	}


	render(){

		return(

			<div> 

				<Navigation3/>
				<SideNav className="mysidenav2">
					  <Collection >
							<CollectionItem href='#' active className="bold">  

								<Icon> home </Icon>
								<span> Inicio </span>
							</CollectionItem>
						  	<CollectionItem href='#'  className="bold">  
						  		<Icon> note </Icon>
						  		 <span> Instructivos </span>
						  	</CollectionItem>
						  	<CollectionItem href='#'  className="bold">  
						  		<Icon> notifications </Icon>
						  		 <span> Notificaciones </span>
						  	</CollectionItem>
					  </Collection>
				</SideNav>

				<div className="inSideNav">
						<br/> <br/> 
						<Row className="ml-2">
						  <Col s={6} m={4} offset="m1">
						        <CardPanel className="wave-card-2">
						        	<div className="bold center">
						        		<h5>  Cajon 1 </h5>
						        	</div>
						        	<Row>
						        		<Col s={6} m={4}>
						        			<img  width="150px" src= {window.location.origin + '/img/good.png'}  className="responsive-img"/> 
						        		</Col>
						        		<Col s={6} m={8}>
						        			<br/> 
						        			<h3 className="center">   <span> 75% </span> </h3>
						        		</Col>

						        	</Row>
						        </CardPanel>
						  </Col>
						  <Col s={6} m={4}>
						       <CardPanel className="wave-card-2">
						        	<div className="bold center">
						        		<h5>  Cajon 2 </h5>
						        	</div>
						        	<Row>
						        		<Col s={6} m={4}>
						        			<img  width="150px" src= {window.location.origin + '/img/bad.png'}  className="responsive-img"/> 
						        		</Col>
						        		<Col s={6} m={8}>
						        			<br/>
						        			<h3 className="center">    <span> 37% </span> </h3>
						        		</Col>

						        	</Row>
						        </CardPanel>
						  </Col>

						  <Col s={8} m={8} offset="m1">
						        <CardPanel className="wave-card-2">
						        	<h4 className="bold center"> Humedad vs Tiempo </h4>
						        	<LineChart />
						        </CardPanel>
						  </Col>
						 </Row>
				</div>




			</div>

			);
	}
}



export default Recycler;
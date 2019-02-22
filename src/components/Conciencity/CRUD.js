import React, {Component } from 'react';
import {Table,CardTitle,SideNav,Icon,Tab, Modal,Tabs,CardPanel,Card,Button,Collection,Row,Col,CollectionItem} from 'react-materialize';
import {NavLink} from 'react-router-dom';
import FormModal from './FormModal';

class CRUD extends Component{

	deleteClick(){
		var data = JSON.parse(sessionStorage.getItem('getData')); 
		fetch("https://api-conciencity.herokuapp.com/api" + this.state.url.other + "?access_token=" + data['token'],
				{
				    method: 'DELETE',
				    body: JSON.stringify({'id':this.state.delete}),
				     headers:{
					    'Content-Type': 'application/json'
					  }
				}
			).then(response => response.json())
			.then(parsedJson => {
				if(parsedJson['error']){
					console.log(parsedJson);
					window.Materialize.toast('Lo sentimos :c, a ocurrido un error!', 1500, 'red');
				}else{

					//notifications.splice(num,1);
					//this.setState({'notifications':notifications });
					window.Materialize.toast('Elemento eliminado correctamente', 1000, 'red');
				}
				
			})
			.catch(error => window.Materialize.toast('Error al intentar conectar con el servidor.', 1500, 'red') );
			
		}
	
	componentWillMount(){

		/*Redirecciona en caso de necesitarlo:  */
		var data = JSON.parse(sessionStorage.getItem('getData'));
		if(data){

			var url = this.state.url;
			var dependence = url['dependence'];



			//Obtiene el primer elemento de nombre name:
			var getRequest = fetch("https://api-conciencity.herokuapp.com/api" + url.get + "?access_token=" + data['token'])
							.then(response => response.json())			
							.then(parsedJson => {
								console.log("heere  ",url,parsedJson);
								if(parsedJson['error'] ){
									console.log("Error de conexión: ",parsedJson['error']);
								}else{
									if(dependence){
										this.setState({
											items:parsedJson
										}); 
									}else{
										this.setState({
											items:parsedJson,
											load:false
										}); 
									}
								}
							});

			//Obtiene el segundo elemento de nombre subname:
			if(dependence){
				var get2Request = fetch("https://api-conciencity.herokuapp.com/api" + dependence['url'] + "?access_token=" + data['token'])
							.then(response => response.json())			
							.then(parsedJson => {


								//El siguiente codigo setea las variables para que tengan la siguiente estructura: 
								//"community":{"options":["Eco Urbe I","Eco Urbe II","Eco Urbe III"],"id":["1","2","3"],"default":"2"}
								console.log(parsedJson);
								var name = dependence['selectName'];
								var fk = dependence['fk'];
								var forms = this.state.forms;
								var id_fk = forms[fk];

								var select = [];
								var select_id = [];

								for(var i = 0; i < parsedJson.length; i++) {
									select.push(parsedJson[i][name])
									select_id.push(parsedJson[i]['id'])
								}
								var js = {"options":select,'id':select_id,'default':id_fk}
								forms[fk] = js;

								this.setState({
									forms:forms,
									load:false
								}); 
							
							});
				}

			Promise.all([getRequest]).then(function(values){
			    console.log("The request arrived successfully.");
			});
		}
	}

	constructor(props){
		super(props);
		this.state = {
			load: true,
			items: [],
			delete: 0,
			url: this.props.url,
			type: this.props.type,
			label: this.props.label,
			forms: this.props.forms
		}	
	}

	render(){
		var load = this.state.load;
		var label = this.state.label;
		
		if(load){

			return(
				<div className="center">
					<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
					<div class="preloader-wrapper big active">
					   <div class="spinner-layer spinner-green-only">
					     <div class="circle-clipper left">
					       <div class="circle"></div>
					     </div><div class="gap-patch">
					       <div class="circle"></div>
					     </div><div class="circle-clipper right">
					       <div class="circle"></div>
					     </div>
					   </div>
					 </div>
					 </div>
				)

		}else{
			
			var items = this.state.items;
			var dependence = this.state.url.dependence;

			const listItems = Object.keys(items).map((elem,i) => {
				var element = items[elem];
				var type=this.state.type;

				var forms= element;
				if(dependence){
					var fk = dependence['fk'];
					var selectForm = this.state.forms[fk];
					selectForm['default'] = forms[fk];
					forms[fk] = selectForm;
					console.log(forms);
				}

				var formPassword = {"password":"","repeat password":""}

				var bottonPassword = "";
				var formModalPassword ="";
				if(type == 'User'){
					bottonPassword = <Button  className=" btn-small btn waves-effect waves-light orange" 

							  					onClick={() => { 
								   					window.$('#FormModalPassword'+(i+1).toString()).modal('open');
												}}>
							  				
									  			<i className="small material-icons"> lock </i>
									  		</Button>

					formModalPassword = <FormModal forms={formPassword} label={"FormModalPassword" + (i+1).toString() } method={'post'} />
				}

				var content ="";
				if(this.props.content){
					var cont = this.props.content;
					content=
						<div className="">

								<NavLink to= { "/Conciencity/Commune/"+ element.id  +  "/"+ element.name + "/Communities"} >
									<Button className=" light-blue darken-2" waves='light'> 
											<Icon right>  keyboard_arrow_right </Icon> {cont.title}

										
									</Button>
								</NavLink>
								
						</div>
				}


				return(
						
						  <CollectionItem> 

						  		<Row>


						  			<Col s={2}>
								  		<i className="medium material-icons"> {label} </i>
						  			</Col>
						  			<Col s={6}>
								  		{element.name}
						  			</Col>
						  			<Col s={4}>
						  				<Button  className=" btn-small btn waves-effect waves-light blue" 

						  					onClick={() => { 
							   					window.$('#FormModal'+(i+1).toString()).modal('open');
											}}>
						  				
								  			<i className="small material-icons"> edit </i>
								  		</Button>
								  		{bottonPassword }

								  		<Button className=" btn-small btn waves-effect waves-light red" 
								  			onClick={() => { 
							   					window.$('#deleteModal').modal('open');
							   					this.setState({'delete':element.id});
											}}>
								  			<i className="small material-icons"> delete </i>
								  		</Button>

										<Modal
									   		id="deleteModal"
										    header='Eliminar elemento' 
										    actions={
										    		<div>
											    	 	 <Button onClick={(event) => { 
											    	 	 			this.deleteClick(event);
																	}} 
																className="green darken-1  modal-close"> Aceptar </Button>
											    	 	 	 &emsp;  &emsp;
											    		 <Button className="red darken-1 modal-close"> Cancelar </Button>
											    		 </div>

											  }  >
										  		<Row>
										  		   <h4> ¿Esta seguro que desea eliminar este elemento? </h4>
										  		</Row>   
										</Modal>

						  			</Col>
										<Col s={12}>
													<br/> 
												   {content}
											</Col>

						  		</Row>
						  		{formModalPassword}
						  		<FormModal forms={forms} label={"FormModal" + (i+1).toString() } method={{'type':'put','http':this.state.url.other}}/>
						  </CollectionItem>
						
					)
				}
			);

			var newform = this.state.forms;
			

			return(
				<div> 
					<center>
						<Button className=" btn-large btn waves-effect waves-light"
							onClick={() => { 
								window.$('#FormModalNewUser').modal('open');
							}}>
						
							<i className="medium material-icons"> {label + '_add'} </i>
						</Button>
						<FormModal forms={newform} label={"FormModalNewUser"} method={{"type":"post","http":this.state.url.other}}/>
					</center>
					<Collection>
						{listItems}
					</Collection>

					
				</div>

				);
		}
	}

}

export default CRUD;
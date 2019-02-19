import React, {Component } from 'react';
import {Table,CardTitle,Input,SideNav,Icon,Tab, Modal,Tabs,CardPanel,Card,Button,Collection,Row,Col,CollectionItem} from 'react-materialize';
import FormModal from './Conciencity/FormModal';

class Profile extends Component{

    componentDidMount(){
        /*
        Aqui agregar fetch para obtener datos:
		var data = JSON.parse(sessionStorage.getItem('getData'));
		var forms = []
		var requestWasteCollection = fetch("https://api-conciencity.herokuapp.com/api/" + data['usertype'] + "/" + data['id'] + "/GETPROFILE?access_token=" + data['token'])
						.then(response => response.json())
						.then(parsedJson => {
							if(parsedJson['error'] ){
								console.log("Error de conexión");
							}else{
								console.log(parsedJson);
								if(parsedJson.data[0].bucket.wasteCollections){
									forms = parsedJson.['data'];
								}
							}
						});

		Promise.all([request])
				 .then((results) => {
				    console.log("Llamadas realizadas correctamente")
				    this.setState({
						  forms: forms,
						  load: false
						});
                    });
        */
	}

    constructor(props){
        super(props);
        
        var forms = {
            "floor": "string",
            "number": "string",
            "rut": "string",
            "name": "string",
            "username": "string",
            "email": "string",
            "communityId": "string"
          }

		this.state = {
			forms:forms,
			username: "Residente",
			load: true
        }
	}

	render(){
        var forms=this.state.forms;
		return (
			<div>
				<h1> Cerrando </h1> 
                <Button  className=" btn-small btn waves-effect waves-light blue" 
					onClick={() => { 
						window.$('#FormProfile').modal('open');
                        }} >
                    Editar Perfil 
                </Button>
                <FormModal forms={forms} label={"FormProfile"} method={{"type":"post","http":"/Conciencity"}}/>
			</div> 
			)
	}
}
export default Profile;

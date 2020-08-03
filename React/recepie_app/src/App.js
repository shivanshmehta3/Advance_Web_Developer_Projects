import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar'
import RecepieList from './RecepieList'
import RecepieForm from './RecepieForm'

class App extends Component {	
	constructor(props){
		super(props);
		this.state = {
			recepies: [
				{
					id: 0,
					title: 'pasta',
					ingredients: ['flour','water'],
					instructions: "Mix all the stuff",
					img: 'pasta.jpg'
				},
				{
					id: 1,
					title: 'maggie',
					ingredients: ['maggie','massala', 'vegetables', 'water', 'salt'],
					instructions: "Mix all the stuff",
					img: 'maggie.jpg'	
				},
				{
					id: 2,
					title: 'tea',
					ingredients: ['tea leaves','water', 'sugar', 'milk'],
					instructions: "Mix all the stuff",
					img: 'tea.jpg'
				}
			],
			nextRecepieId: 3,
			showForm: false
		}
		
		this.onNewRecepieShowHide = (e)=> {
			var showFormFlag = !(e.target.name === 'CloseButton');
			var recepiesCopy = [...this.state.recepies];
			var newState = {...this.state, recepies: recepiesCopy, showForm: showFormFlag};
			this.setState(newState);
		}
		
		this.addRecepie = (obj) => {
			var newRecepies = [...this.state.recepies];
			var newRecepieId = this.state.nextRecepieId;
			newRecepies.push({...obj, id: newRecepieId});
			newRecepieId++;
			var newState = {recepies: newRecepies, nextRecepieId: newRecepieId, showForm: false};
			this.setState(newState);	
		}
		this.deleteRecepie = (id) =>{
			var newRecepies = [...this.state.recepies];
			newRecepies = newRecepies.filter((r)=>(r.id!==id));
			this.setState({...this.state, recepies: newRecepies});
		}
	}
	
	static defaultProps = {
		navButtons: ['New Recipe', 'Home', 'About', 'Contact Us']
	}
	
	render(){
		if(this.state.showForm){
			var recepieForm = <RecepieForm className = 'RecepieFormContainer'
								  onCloseForm= {this.onNewRecepieShowHide}
								  onSave = {this.addRecepie}/>;
		}
		return (
			<div className="App">
				  <NavBar buttons = {this.props.navButtons}
					 onNewRecepieClick = {this.onNewRecepieShowHide}/>
				  {recepieForm}
				  <RecepieList recepieList = {this.state.recepies}
					  onDelete = {this.deleteRecepie}/>
			</div>
	  );
	}
}

export default App;

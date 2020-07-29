import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar'
import RecepieList from './RecepieList'

class App extends Component {	
	
	static defaultProps = {
		navButtons: ['New Recepie', 'Home', 'About', 'Contact Us'],
		recepies: [
			{
				title: 'pasta',
				ingredients: ['flour','water'],
				instructions: "Mix all the stuff",
				img: 'pasta.jpg'
			},
						{
				title: 'maggie',
				ingredients: ['maggie','massala', 'vegetables', 'water', 'salt'],
				instructions: "Mix all the stuff",
				img: 'maggie.jpg'	
			},
			{
				title: 'tea',
				ingredients: ['tea leaves','water', 'sugar', 'milk'],
				instructions: "Mix all the stuff",
				img: 'tea.jpg'
			}
		]
	}
	
	render(){
	  return (
		<div className="App">
			  <NavBar buttons = {this.props.navButtons}/>
			  <RecepieList recepieList = {this.props.recepies}/>
		</div>
	  );
	}
}

export default App;

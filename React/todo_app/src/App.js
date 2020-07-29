import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			todos: [],
			newTodo: ''
		}
		this.performSubmit = (e) =>{
			e.preventDefault();
			var todos = [...this.state.todos, this.state.newTodo];
			this.setState({todos, newTodo:''});
			
		}
		this.onInputChange = (e) =>{
			this.setState({...this.state.todos, newTodo: e.target.value});
		}
	}
	render(){
		var todoList = this.state.todos.map((value)=>(<li>{value}</li>));
		return (
			<div className="App">
				<div className='inner'>
					<h1>Simple Todo App</h1>
					<form className= 'form' onSubmit = {this.performSubmit}>
						<input type='text'
							className = 'input'
							onChange = {this.onInputChange}
							placeholder = 'What needs to be done?'
							value= {this.state.newTodo}
						/>
						<button type='submit'>SAVE</button>
					</form>
					<ul>{todoList}</ul>
				</div>
			</div>	 
		);
	}
}

export default App;

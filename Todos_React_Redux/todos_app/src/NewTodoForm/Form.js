import React, {Component} from 'react';
import {actionAdd} from '../ActionMaker/ActionMaker'
import {connect} from 'react-redux';

class Form extends Component{
	constructor(props){
		super(props);
		this.state = {
			inputValue : ''
		}
		this.handleSubmit = handleSubmit.bind(this);
		this.handleChange = handleChange.bind(this);
		this.mapStateToProps = mapStateToProps.bind(this);
	}
	
	render(){
		return(
			<div>
				<form onSubmit = {this.handleSubmit}>
					<input onChange = {this.handleChange} type = 'text' placeholder = 'Enter Todo!'></input>
					<button type = 'submit'>Add Todo</button>
				</form>
			</div>
		);
	}
}

function handleSubmit(event){
	event.preventDefault();
	this.props.actionAdd(this.state.inputValue);
	event.target.reset();
}
	
function handleChange(event){
	let inputValue = event.target.value;
	this.setState({inputValue});
}

function mapStateToProps(state){
	return this.props = {...state};
}

export default connect(mapStateToProps, {actionAdd})(Form);
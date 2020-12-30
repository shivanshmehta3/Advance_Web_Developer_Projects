import React, {Component} from 'react';
import Todo from '../Todo/todo';
import {connect} from 'react-redux'
import {actionRemove} from '../ActionMaker/ActionMaker';

class TodoList extends Component{
	constructor(props){
		super(props);
		this.mapStateToProps = mapStateToProps.bind(this);
		this.handleRemoveTodo = handleRemoveTodo.bind(this);
	}

	render() {
		var list = this.props.todos.map(val => <Todo value = {val.value} id = {val.id} onClickRemove = {this.handleRemoveTodo}/>)
		return(
			<div>							
				<ul>
					{list}
				</ul>
			</div>
		);
	}
}

function mapStateToProps(state){
	return this.props = {...state};
}

function handleRemoveTodo(event){
	debugger
	this.props.actionRemove(event.target.id);
}

export default connect(mapStateToProps,{actionRemove})(TodoList);
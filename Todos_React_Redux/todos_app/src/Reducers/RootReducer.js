import {ADD_TODO, REMOVE_TODO} from '../ActionMaker/ActionMaker'

var initState = {
	todos: [{value:'Eat', id: 1}],
	id: 1
}

export default function rootReducer(state = initState, action){
	switch(action.type){
		case ADD_TODO:{
			let newState = {...state};
			newState.id++;
			newState.todos = [...newState.todos, {value: action.value, id: newState.id}]
			return newState;
		}
		case REMOVE_TODO:{
			debugger
			let newState = {...state};
			newState.todos = newState.todos.filter(val => val.id !== parseInt(action.id));
			return newState;
		}
		default:{
			return state;
		}
	}
}
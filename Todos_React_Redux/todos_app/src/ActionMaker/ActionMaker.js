export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';

export function actionAdd(val){
	return {
		type: ADD_TODO,
		value: val
	}
}

export function actionRemove(id){
	return {
		type: REMOVE_TODO,
		id
	}
}
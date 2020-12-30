export default function Todo(props){
	return(
		<div>
			<li id= {props.id}>{props.value}</li>
			<button id= {props.id} onClick = {props.onClickRemove}>X</button>
		</div>
	);
}
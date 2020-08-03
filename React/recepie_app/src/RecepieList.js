import React, {Component} from 'react'
import './recepie_list.css'
import RecepieCard from './RecepieCard'

class RecepieList extends Component{
	static defaultProps = {
		onDelete: () =>{}
	}
	render(){
		var recepieList = this.props.recepieList.map((value)=> (<RecepieCard key = {value.id} {...value} onDelete = {this.props.onDelete}/>));
		return(
			<div className = 'topContainer'>
				{recepieList}
			</div>
		);
	}
}

export default RecepieList;
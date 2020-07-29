import React, {Component} from 'react'
import './recepie_list.css'
import RecepieCard from './RecepieCard'

class RecepieList extends Component{
	render(){
		var recepieList = this.props.recepieList.map((value, index)=> (<RecepieCard key = {index} {...value}/>));
		return(
			<div className = 'topContainer'>
				{recepieList}
			</div>
		);
	}
}

export default RecepieList;
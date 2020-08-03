import React, {Component} from 'react'
import './recepie_card.css'

class RecepieCard extends Component{
		constructor(props){
		super(props);
		this.handleDelete = () => {
			this.props.onDelete(this.props.id);
		}
	}
	static defaultProps = {
		onDelete: () =>{}
	}
	render(){
		const {title, ingredients, instructions, img} = this.props;
		var ingrList = ingredients.map((value,index) => (<li key = {index}>{value}</li>));
		return(
			<div className = 'recepie_card'>
				<div className = 'recepie_card_img_div'>
					<img src ={img} alt = {title}/>
				</div>
				<div className = 'recepie_card_content'>
					<div>
					<h2 className = 'recepie_card_title'>{title}</h2>
					<h3>Ingredients:</h3>
					<ul>
						{ingrList}
					</ul>
					<h3>Instructions:</h3>
					<p>{instructions}</p>
					</div>
					<div className= 'DelBtnDiv'>
					<button className='recepieDeleteBtn'
						type = 'button'
						onClick = {this.handleDelete}>Delete</button>
					</div>
				</div>
			</div>
		);
	}
}

export default RecepieCard;
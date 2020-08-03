import React, {Component} from 'react'
import './recepie_form.css'

class RecepieForm extends Component{
	
	static defaultProps = {
		onCloseForm: ()=>{},
		onSave: ()=>{}
	}
	constructor(props){
		super(props);
		this.state = {
			title: '',
			ingredients: [''],
			instructions: '',
			img: ''
		}
		
		this.updateInputChanges = (e) => {
			this.setState({...this.state, [e.target.id]: e.target.value});
		}
		this.updateIngredients = (e) =>{
			var newIngredients = this.state.ingredients.slice();
			newIngredients[e.target.id] = e.target.value;
			this.setState(({...this.state, ingredients: newIngredients}));
		}
		this.addIngredient = (e) =>{
			var newIngredients = this.state.ingredients.slice();
			newIngredients.push('');
			this.setState(({...this.state, ingredients: newIngredients}));
		}
		this.handleSubmit = (e) =>{
			e.preventDefault();
			this.props.onSave({...this.state});
		}
	}
	render(){
		var ingredients = this.state.ingredients.map((value, index)=>{
			return(
				<div className = 'InputDiv' key = {index}>
					<label htmlFor = {index}>{`${index+1}.`}</label>
					<input
						type = 'text'
						value = {value}
						id= {index}
						placeholder= 'Ingredient'
						onChange = {this.updateIngredients}/>
				</div>
			);
		});
		return(
			<div className = 'RecepieForm'>
				<form className = 'Form' onSubmit = {this.handleSubmit}>
					<button className='CloseButton'
						name = 'CloseButton'
						type = 'button'
						onClick = {this.props.onCloseForm}
					>
						X
					</button>
					<div className = 'InputDiv'>
						<label htmlFor= 'title'>Title</label>
						<input
							type= 'text'
							onChange = {this.updateInputChanges}
							id = 'title'
							/>
					</div>
					<div>
						<label htmlFor= 'instructions'>Instructions</label>
						<div className = 'InputDiv'>
							<textarea
								className = 'InstructionsInput'
								rows = '3'
								id = 'instructions'
								placeholder= 'Add instructions'
								onChange = {this.updateInputChanges}
								/>
						</div>
					</div>
					<div>{ingredients}</div>
					<button 
						className='BlueButton'
						onClick={this.addIngredient}
						type = 'button'
					>
						+
					</button>
					<div className = 'InputDiv'>
					<label htmlFor= 'imgUrl'>Image URL</label>
						<input
							type= 'text'
							onChange = {this.updateInputChanges}
							id= 'img'
							/>
					</div>
					<button className='BlueButton'
						type = 'submit'>Save</button>
				</form>
			</div>
		);
	}
}

export default RecepieForm;
import React, {Component} from 'react'
import './nav_bar.css'

class NavBar extends Component{
	static defaultProps = {
		onNewRecepieClick: ()=>{}
	}
	render(){
		var onNewRecepieClick = this.props.onNewRecepieClick;
		var buttons = this.props.buttons.map((value, index) => {
			var returnItem = value === 'New Recipe' ? 
				<button className = 'navButton' key = {index} onClick = {onNewRecepieClick} type = 'button'>{value}</button> : 
				<button className = 'navButton' key = {index}>{value}</button>;
			return returnItem;
		});
		
		return(
			<div className = 'top'>
				<div className = 'leftSection'>
					<h1>Recipe App</h1>
				</div>
				<div className = 'rightSection'>
					<div className = 'navButtonsDiv'>
						{buttons}
					</div>
				</div>
			</div>
		);
	}
}

export default NavBar;
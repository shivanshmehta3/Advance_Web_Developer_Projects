import React, {Component} from 'react'
import './nav_bar.css'

class NavBar extends Component{
	render(){
		var buttons = this.props.buttons.map((value, index) => (<button key = {index}>{value}</button>));
		
		return(
			<div className = 'top'>
				<div className = 'leftSection'>
					<h1>Recepie App</h1>
				</div>
				<div className = 'rightSection'>
					<div className = 'navButtons'>
						{buttons}
					</div>
				</div>
			</div>
		);
	}
}

export default NavBar;
import { Component } from 'react'

class Card extends Component {
	render() {
		return (
			<div className='card'>
				<h3 class='title'>{this.props.title}</h3>
				<div class='description'>{this.props.description}</div>
			</div>
		)
	}
}

export default Card

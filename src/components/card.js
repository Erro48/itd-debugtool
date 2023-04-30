import { Component } from 'react'
import './card.css'

class Card extends Component {
	render() {
		return (
			<a href='/' className='card td-card py-3 px-4'>
				<div className='row'>
					<div className='col-10'>
						<h3 className='title'>{this.props.title}</h3>
						<div className='description'>{this.props.description}</div>
					</div>
					<div className='col-2 d-flex d-sm-none'>
						<img
							src='../icons/left-arrow-dark.svg'
							alt={'Select ' + this.props.title}
							className='icon right-arrow'
						/>
					</div>
				</div>
			</a>
		)
	}
}

export default Card

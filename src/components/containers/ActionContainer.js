import React from 'react'
import CardList from '../utils/CardList'

const cards = [
	{
		title: 'setAngle',
		description: 'Set a specified angle',
		address: 'address/thing/wheat/angle',
	},
	{
		title: 'changeColor',
		description: 'Set LED matrix color',
		address: 'address/thing/wheat/color',
	},
	{
		title: 'goToCoords',
		description: 'Go to the specified coordinates',
		address: 'address/thing/wheat/coords',
	},
]

const ActionContainer = () => {
	return (
		<section className='prop-container col-12'>
			<header className='pt-3'>
				<h2>Actions</h2>
				<hr />
			</header>
			<CardList cards={cards} />
		</section>
	)
}

export default ActionContainer

import React from 'react'
import Card from './Card'

import './cardList.css'

const CardList = ({ cards, className, onCardClick }) => {
	// const handleCardClick = (title) => {
	// 	console.log('Clicked ' + title)
	// }

	return (
		<ul className={'p-2 overflow-auto ' + className}>
			{cards.map((card) => {
				return (
					<li key={card.title}>
						<Card {...card} onCardClick={onCardClick} />
					</li>
				)
			})}
		</ul>
	)
}

export default CardList

import React from 'react'
import Card from './Card'

import './cardList.css'

const CardList = ({ cards, className, onCardClick }) => {
	return (
		<ul className={'card-list py-2 mb-0 ' + className}>
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

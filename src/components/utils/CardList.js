import React from 'react'
import Card from './Card'

import './cardList.css'
import Icon from './Icon'

const CardList = ({ cards, onRemoveCard, className, onCardClick }) => {
	return (
		<ul className={'card-list mb-0 ' + className}>
			{cards.map((card) => {
				return (
					<li key={card.title}>
						<Card
							{...card}
							onRemoveCard={onRemoveCard}
							onCardClick={onCardClick}
						/>
					</li>
				)
			})}
		</ul>
	)
}

export default CardList

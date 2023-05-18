import React from 'react'
import Card from './Card'

import './cardList.css'

const CardList = ({ cards, className, onCardClick }) => {
	const insertHr = (aboveCard) => {
		if (cards.indexOf(aboveCard) !== cards.length - 1) {
			return <hr className='card-separator m-0 d-none d-sm-block' />
		}
	}
	return (
		<ul className={'p-2 overflow-auto ' + className}>
			{cards.map((card) => {
				return (
					<React.Fragment>
						<li key={card.key}>
							<Card {...card} onCardClick={onCardClick} />
						</li>
						{insertHr(card)}
					</React.Fragment>
				)
			})}
		</ul>
	)
}

export default CardList

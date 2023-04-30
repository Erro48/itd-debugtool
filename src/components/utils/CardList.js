import React from 'react'
import Card from './Card'

import './cardList.css'

const CardList = ({ cards }) => {
	const insertHr = (aboveCard) => {
		if (cards.indexOf(aboveCard) != cards.length - 1) {
			return <hr className='card-separator m-0 d-none d-sm-block' />
		}
	}
	return (
		<ul className='px-2'>
			{cards.map((card) => {
				return (
					<React.Fragment>
						<li key={card.title}>
							<Card {...card} />
						</li>
						{insertHr(card)}
					</React.Fragment>
				)
			})}
		</ul>
	)
}

export default CardList

import React from 'react'
import Card from './Card'

const CardList = ({ cards }) => {
	return (
		<ul className='px-2'>
			{cards.map((card) => {
				return (
					<li key={card.title}>
						<Card {...card} />
					</li>
				)
			})}
		</ul>
	)
}

export default CardList

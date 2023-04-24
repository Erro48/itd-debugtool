import Card from './card'

const cards = [
	{ title: 'tractor', description: 'Is a tractor which goes vroom vroom' },
	{ title: 'field', description: 'Boring land of dirt' },
	{ title: 'wheet', description: 'Vibing in the wind 😎' },
]

function TdContainer() {
	return (
		<section className='td-container col-12 col-sm-3'>
			<h2>Thing Descriptions</h2>
			<ul>
				{cards.map((card, index) => {
					return (
						<li>
							<Card title={card.title} description={card.description} />
						</li>
					)
				})}
			</ul>
		</section>
	)
}

export default TdContainer

import Card from './Card'

const cards = [
	{ title: 'tractor', description: 'Is a tractor which goes vroom vroom' },
	{ title: 'field', description: 'Boring land of dirt' },
	{ title: 'wheet', description: 'Vibing in the wind 😎' },
]

function TdContainer() {
	return (
		<section className='td-container col-12 col-sm-3'>
			<header className='pt-3 px-2'>
				<h2>Thing Descriptions</h2>
				<hr />
			</header>
			<ul className='px-2'>
				{cards.map((card, index) => {
					return (
						<li key={index}>
							<Card title={card.title} description={card.description} />
						</li>
					)
				})}
			</ul>
		</section>
	)
}

export default TdContainer

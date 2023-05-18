import CardList from '../utils/CardList'
import './tdPanel.css'

function TdPanel({ thingDescriptions, onTdClick }) {
	return (
		<section className='td-container col-12 col-lg-3 px-0'>
			<header className='pt-3'>
				<h2>Thing Descriptions</h2>
				<hr />
			</header>
			<CardList
				cards={thingDescriptions}
				className={'td-card-list'}
				onCardClick={onTdClick}
			/>
		</section>
	)
}

export default TdPanel

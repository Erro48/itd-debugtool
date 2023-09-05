import React from 'react'
import CardList from '../utils/CardList'
import './asidePanels.css'
import classNames from 'classnames'

const AsidePanel = ({ sections, onRemoveCard, dataSection }) => {
	return (
		<div className='container px-md-0' data-panel={dataSection}>
			<div className='row w-100 m-auto'>
				{sections.map((section) => (
					<section
						className={classNames(
							'col-12 col-lg-12 px-md-0 px-0',
							`col-sm-${12 / sections.length}`
						)}
						data-panel={section.dataSection}
						key={section.title}
					>
						<header className='mx-md-2'>
							<h2>{section.title}</h2>
						</header>
						<CardList
							cards={section.list}
							className={section.dataSection}
							onRemoveCard={onRemoveCard}
							onCardClick={section.handleElementClick}
						/>
					</section>
				))}
			</div>
		</div>
	)
}

export default AsidePanel

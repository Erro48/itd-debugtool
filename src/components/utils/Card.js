import React from 'react'
import Icon from './Icon'
import classNames from 'classnames'

import './card.css'

const Card = ({
	title,
	description,
	address,
	version,
	active,
	affordanceType,
	onRemoveCard,
	onCardClick,
}) => {
	const removable = onRemoveCard !== undefined

	const getVersion = () => {
		if (version !== undefined) {
			return (
				<span className='version col-4 d-none d-sm-inline'>v{version}</span>
			)
		}
	}

	return (
		<div className='row m-0 p-0'>
			<button
				className={classNames(
					'card py-2 px-1 order-1 order-sm-0',
					{ 'col-10 col-lg-9': removable },
					{ 'col-12': !removable }
				)}
				onClick={() => onCardClick(title)}
				data-active={active ? active : false}
				data-type={affordanceType}
			>
				<div className='row w-100 mx-auto'>
					<div className='col-10 col-sm-11 col-sm-12'>
						<header>
							<h3 className={'title'}>{title}</h3>
						</header>
						<p className='description pt-2 pt-sm-1'>
							{getVersion()}
							{description}
						</p>
					</div>
					<div className='col-2 col-sm-1 d-flex d-sm-none'>
						<Icon
							src='../icons/left-arrow-dark.svg'
							alt={'Select ' + title}
							classname='right-arrow'
						/>
					</div>
				</div>
			</button>

			<button
				className={classNames(
					'col-2 transparent-btn remove-td',
					{ 'd-none': !removable },
					{ 'col-lg-3': removable }
				)}
				onClick={() => onRemoveCard(title)}
			>
				<Icon
					src={'./icons/remove.svg'}
					alt={`Remove ${title} thing description`}
				/>
			</button>
		</div>
	)
}

export default Card

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
	onCardClick,
}) => {
	const getVersion = () => {
		if (version !== undefined) {
			return <span className='version col-4 d-none d-sm-block'>{version}</span>
		}
	}

	return (
		<button
			href='/'
			className={classNames(
				'card',
				'td-card',
				'py-3',
				'px-4',
				'p-sm-2',
				'w-100'
			)}
			onClick={() => onCardClick(title)}
			data-active={active ? active : false}
		>
			<div className='row'>
				<div className='col-10 col-sm-12'>
					<header>
						<div className='row'>
							<h3
								className={
									'title col-12 col-sm-' + (version === undefined ? '12' : '8')
								}
							>
								{title}
							</h3>
							{getVersion()}
						</div>
						<p className='subtitle d-none d-sm-block'>{address}</p>
					</header>
					<div className='description pt-2 pt-sm-1'>{description}</div>
				</div>
				<div className='col-2 d-flex d-sm-none'>
					<Icon
						src='../icons/left-arrow-dark.svg'
						alt={'Select ' + title}
						classname='right-arrow'
					/>
				</div>
			</div>
		</button>
	)
}

export default Card

import React from 'react'

import './card.css'

const Card = ({ title, description, address, version }) => {
	const getVersion = () => {
		if (version !== undefined) {
			return <span className='version col-4 d-none d-sm-block'>{version}</span>
		}
	}

	return (
		<a href='/' className='card td-card py-3 px-4'>
			<div className='row'>
				<div className='col-10 col-sm-12'>
					<header>
						<div className='row'>
							<h3 className='title col-8'>{title}</h3>
							{getVersion()}
						</div>
						<h4 className='subtitle d-none d-sm-block'>{address}</h4>
					</header>
					<div className='description pt-2'>{description}</div>
				</div>
				<div className='col-2 d-flex d-sm-none'>
					<img
						src='../icons/left-arrow-dark.svg'
						alt={'Select ' + title}
						className='icon right-arrow'
					/>
				</div>
			</div>
		</a>
	)
}

export default Card

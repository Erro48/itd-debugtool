import React from 'react'
import classNames from 'classnames'
import './banner.css'
import Icon from './Icon'

const getIconUrl = (type) => {
	let iconName
	switch (type) {
		case 'warning': {
			iconName = 'warning'
			break
		}
		default: {
			iconName = 'gears'
		}
	}

	return `./icons/${iconName}.svg`
}

const Banner = ({ type = 'info', children }) => {
	return (
		<section className={classNames('row banner', `${type}-banner`)}>
			<div className='col-4 col-md-3 col-lg-2 col-xxl-1'>
				<Icon src={getIconUrl(type)} alt={''} />
			</div>
			<div className='col my-auto'>
				<p className='mb-0'>{children}</p>
			</div>
		</section>
	)
}

export default Banner

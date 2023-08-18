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
		case 'danger': {
			iconName = 'folder-failed'
			break
		}
		default: {
			iconName = 'gears'
		}
	}

	return `./icons/${iconName}.svg`
}

const Banner = ({
	type = 'info',
	closable = false,
	title,
	onClose,
	classname,
	children,
}) => {
	return (
		<section className={classNames('banner', `${type}-banner`, classname)}>
			{(title || closable) && (
				<header className='row w-100 mx-auto'>
					<div className='col-11'>{title}</div>
					<div className='col-1 d-flex justify-content-end'>
						{closable && (
							<button className='button transparent-btn p-0'>
								<Icon
									src='./icons/close.svg'
									alt='Close'
									classname='small-icon'
									onClick={onClose}
								/>
							</button>
						)}
					</div>
				</header>
			)}
			<div className='row w-100 mx-auto'>
				<div className='col-3 col-lg-2 col-xxl-1 d-flex align-items-center'>
					<Icon src={getIconUrl(type)} alt='' />
				</div>
				<div className='col my-auto'>
					<p className='mb-0'>{children}</p>
				</div>
			</div>
		</section>
	)
}

export default Banner

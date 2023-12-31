import React from 'react'
import classnames from 'classnames'
import './icon.css'

const Icon = ({ src, alt, role, onClick, classname }) => {
	return (
		<img
			src={src}
			alt={alt}
			className={classnames('icon', classname)}
			// type='button'
			data-bs-toggle='tooltip'
			data-bs-placement='bottom'
			title={alt}
			data-src={src}
			onClick={onClick}
			role={role}
		/>
	)
}

export default Icon

import React from 'react'
import classnames from 'classnames'

const Icon = (props) => {
	const { src, alt } = props
	return (
		<img
			src={src}
			alt={alt}
			className={classnames('icon', props.classname)}
			type='button'
			data-bs-toggle='tooltip'
			data-bs-placement='bottom'
			title={alt}
		/>
	)
}

export default Icon

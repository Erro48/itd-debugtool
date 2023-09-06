import React, { useState } from 'react'
import Icon from '../Icon'
import classNames from 'classnames'

const EditModeButton = ({ className, onClick }) => {
	const [imgSrc, setImgSrc] = useState('./icons/lock.svg')

	const handleClick = () => {
		if (imgSrc === './icons/lock.svg') {
			setImgSrc('./icons/unlock.svg')
		} else {
			setImgSrc('./icons/lock.svg')
		}

		onClick()
	}

	return (
		<Icon
			src={imgSrc}
			alt='Enable edit mode'
			classname={classNames('button light-btn', className)}
			role='toggle-edit-mode-button'
			onClick={handleClick}
		/>
	)
}

export default EditModeButton

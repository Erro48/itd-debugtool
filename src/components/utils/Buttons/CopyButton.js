import React, { useState } from 'react'
import Icon from '../Icon'
import classNames from 'classnames'

const CopyButton = ({ textElement, copyBtnElement, className }) => {
	const COPY_ANIMATION_DELAY = 2000
	const [imgSrc, setImgSrc] = useState('./icons/copy.svg')

	const copyText = () => {
		const code = document.querySelector(textElement).innerHTML
		navigator.clipboard.writeText(code)
	}

	const startAnimation = () => {
		const copyBtn = document.querySelector(copyBtnElement)

		setImgSrc('./icons/tick-outline.svg')

		setTimeout(() => {
			setImgSrc('./icons/copy.svg')
		}, COPY_ANIMATION_DELAY)
	}

	const handleClick = () => {
		copyText()
		startAnimation()
	}

	return (
		<Icon
			src={imgSrc}
			alt='Copy'
			classname={classNames('button light-btn', className)}
			role='copy-button'
			onClick={handleClick}
		/>
	)
}

export default CopyButton

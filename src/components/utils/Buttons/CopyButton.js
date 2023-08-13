import React from 'react'
import Icon from '../Icon'

const CopyButton = ({ textElement, copyBtnElement }) => {
	const COPY_ANIMATION_DELAY = 2000

	const copyText = () => {
		const code = document.querySelector(textElement).innerHTML
		navigator.clipboard.writeText(code)
	}

	const startAnimation = () => {
		const copyBtn = document.querySelector(copyBtnElement)

		copyBtn.src = './icons/tick-outline.svg'
		copyBtn.classList.add('copy-btn-animation')

		setTimeout(() => {
			copyBtn.src = './icons/copy.svg'
			copyBtn.classList.remove('copy-btn-animation')
		}, COPY_ANIMATION_DELAY)
	}

	const handleClick = () => {
		copyText()
		startAnimation()
	}

	return (
		<Icon
			src='./icons/copy.svg'
			alt='Copy'
			classname={'button light-btn'}
			onClick={handleClick}
		/>
	)
}

export default CopyButton

import React, { useEffect, useState } from 'react'
import Banner from './Banner'
import './modal.css'

const Modal = ({ type, show, onClose, children }) => {
	const [open, setOpen] = useState(show)

	useEffect(() => setOpen(show), [show])

	useEffect(() => {
		const modal = document.querySelector('[data-modal]')
		modal.addEventListener('cancel', (e) => e.preventDefault())
		if (open) {
			modal.showModal()
		} else {
			modal.close()
		}
	}, [open])

	return (
		<dialog data-modal>
			<section className='row w-100 mx-auto'>
				<div className='col-md-3'></div>
				<div className='col-12 col-md-6'>
					<Banner type={type} closable={true} onClose={onClose}>
						{children.message}
					</Banner>
				</div>
			</section>
		</dialog>
	)
}

export default Modal

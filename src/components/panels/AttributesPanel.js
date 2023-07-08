import React from 'react'
import Breadcrumbs from '../utils/Breadcrumbs'

const AttributesPanel = ({ affordance }) => {
	if (affordance === undefined) return <></>

	affordance = {
		...affordance,
		address: `192.168.47.134/aff-type/${affordance.title}`,
	}
	return (
		<section className='col col-sm-12 px-0'>
			<header>
				<h2>{affordance.title}</h2>
				<p className='subtitle'>{affordance.address}</p>
			</header>
			<Breadcrumbs />
			<section className='row px-2'>
				<div className='col-12 col-sm-7 mb-3 mb-sm-0'>
					<ul class='m-0 attributes-list overflow-auto'>
                        {}
                    </ul>
				</div>
			</section>
			<footer></footer>
		</section>
	)
}

export default AttributesPanel

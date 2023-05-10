import Attribute from '../utils/Attribute/Attribute'
import JsonDisplay from './JsonDisplay'
import Icon from '../utils/Icon'
import Breadcrumbs from '../utils/Breadcrumbs'
import './descriptionPanel.css'

function PropDescription({ interaction, address, attributes }) {
	return (
		<section className='col col-sm-12 px-0 prop-description'>
			<header className='pt-3'>
				<h2 className='title'>{interaction}</h2>
				<p className='subtitle'>{address}</p>
				<hr />
			</header>
			<Breadcrumbs />
			<div class='row px-2'>
				<div class='col-12 col-sm-7 mb-3 mb-sm-0'>
					<ul className='m-0 attributes-list overflow-auto'>
						{attributes.map((attribute) => {
							return (
								<li key={attribute.name}>
									<Attribute {...attribute} />
								</li>
							)
						})}
					</ul>
				</div>
				<div className='col-12 col-sm-5 p-0'>
					<JsonDisplay />
				</div>
			</div>
			<footer>
				<hr />
				<div className='row'>
					<div className='col-2 text-center d-flex'>
						<button class='button light-btn icon-btn'>
							<Icon
								src='../icons/left-arrow-dark.svg'
								alt={'Previous section'}
							/>
						</button>
					</div>

					<div class='d-none d-sm-block col-sm-6'></div>
					<div className='col-8 col-sm-4 d-flex justify-content-end'>
						<button className='button primary-btn w-100 w-sm-auto'>
							Send request
						</button>
					</div>

					<div className='col-2 d-sm-none'></div>
				</div>
			</footer>
		</section>
	)
}

export default PropDescription

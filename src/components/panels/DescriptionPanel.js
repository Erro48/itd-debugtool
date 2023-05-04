import Attribute from '../utils/Attribute/Attribute'
import JsonDisplay from './JsonDisplay'

function PropDescription({ interaction, address, attributes }) {
	return (
		<section className='col col-sm-12 px-0 prop-description'>
			<header className='pt-3'>
				<h2 className='title'>{interaction}</h2>
				<p className='subtitle'>{address}</p>
				<hr />
			</header>
			{/* Attributes */}
			<div class='row px-2'>
				<div class='col-12 col-sm-7'>
					<ul>
						{attributes.map((attribute) => {
							return (
								<li key={attribute.name}>
									<Attribute {...attribute} />
								</li>
							)
						})}
					</ul>
				</div>
				<div class='col-12 col-sm-5 p-0'>
					<JsonDisplay />
				</div>
			</div>
			<footer>
				<hr />
				<button>Send request</button>
			</footer>
		</section>
	)
}

export default PropDescription

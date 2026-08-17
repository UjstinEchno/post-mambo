import Menu from './Menu';
import contacts from '../data/contacts.json';

function Contact () {
	return (
		<div>
			<Menu />
			<>
				<div className='overflow-hidden shrink-0 h-screen relative bg-olive'>
					<div className='inline-block'>
						<div className='mt-80 ml-8 mr-8'>
							<div className='w-screen flex flex-col items-center justify-center align-center'>
								{contacts.map((contact) => (
									<div
										key={contact.job}
										className='items-center justify-center font-authenticSans130 text-3xl bg-pink'>
										{contact.job}
										<a
											href={`mailto:${contact.email}`}
											className='text-4xl ml-3 text-darkyellow'>
											{contact.email}
										</a>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</>
		</div>
	);
}

export default Contact;

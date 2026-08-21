import Menu from './Menu';
import contacts from '../data/contacts.json';

function Contact () {
	return (
		<div>
			<Menu />
			<>
				<div className='overflow-hidden shrink-0 h-screen relative bg-olive flex items-center justify-center'>
					<div className='w-full flex flex-col items-center justify-center align-center px-8'>
						{contacts.map((contact) => (
							<div
								key={contact.job}
								className='items-center justify-center font-authenticSans130 text-lg md:text-3xl bg-pink'>
								{contact.job}
								<a
									href={`mailto:${contact.email}`}
									className='text-xl md:text-4xl ml-3 text-darkyellow'>
									{contact.email}
								</a>
							</div>
						))}
					</div>
				</div>
			</>
		</div>
	);
}

export default Contact;

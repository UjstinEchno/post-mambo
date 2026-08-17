import { Link } from 'react-router-dom';

function Menu () {
	return (
		<div data-nav className='fixed z-50 bottom-11 max-[640px]:right-6 md:left-14 font-authenticSans150 text-medium scale-100 origin-bottom-left'>
			<div className='rounded-xl bg-silver overflow-hidden grid grid-cols-2 border-2 border-white shadow-lg shadow-black/30'>
				<Link
					to='/'
					className='text-blue hover:bg-blue hover:text-silver transition-colors duration-300 px-5 py-3 text-center block border-r border-b border-[#fefec0]'
				>
					Home
				</Link>
				<Link
					to='/contact'
					className='text-olive hover:bg-olive hover:text-silver transition-colors duration-300 px-5 py-3 text-center block border-b border-[#fefec0]'
				>
					Contact
				</Link>
				<Link
					to='/projects'
					className='text-pink hover:bg-pink hover:text-silver transition-colors duration-300 px-5 py-3 text-center block border-r border-[#fefec0]'
				>
					Projects
				</Link>
				<Link
					to='/about'
					className='text-orange hover:bg-orange hover:text-silver transition-colors duration-300 px-5 py-3 text-center block'
				>
					People
				</Link>
			</div>
		</div>
	);
}

export default Menu;

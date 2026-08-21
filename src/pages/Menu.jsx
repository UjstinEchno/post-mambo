import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Menu () {
	// --- EXPERIMENTAL: auto-hide on scroll ----------------------------------
	// Added to stop the fixed nav from sitting on top of scrolled content
	// (credit cards, contact text, etc.) on small screens. Hides while
	// scrolling down, reappears on scroll up or near the top of the page.
	// If this doesn't fit the site's feel, it's safe to roll back: delete
	// this block, delete the two now-unused imports above, and replace the
	// className below with the plain (non-templated) string it used to be.
	const [visible, setVisible] = useState(true);
	const lastScrollY = useRef(0);

	useEffect(() => {
		const onScroll = () => {
			const y = window.scrollY;
			const scrollingDown = y > lastScrollY.current;
			setVisible(!scrollingDown || y < 80);
			lastScrollY.current = y;
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);
	// --- END EXPERIMENTAL ----------------------------------------------------

	return (
		<div
			data-nav
			className={`fixed z-50 bottom-11 max-[640px]:right-6 md:left-14 font-authenticSans150 text-medium scale-100 origin-bottom-left transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
		>
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

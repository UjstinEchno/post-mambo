import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function HeaderLogo () {
	const { pathname } = useLocation();
	const isHome = pathname === '/';
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		if (isHome) return;
		const onScroll = () => setScrolled(window.scrollY > 10);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, [isHome]);

	if (isHome) {
		return (
			<div className='fixed w-full,
							lg:w-full
							xl:w-full
							2xl:w-full
							z-10
							md:-top-3
							md:-left-3 
							md:-right-2 
							lg:-top-6 
							lg:-left-6 
							lg:-right-4 
							xl:-top-6 
							xl:-left-6 
							xl:-right-4 
							2xl:-top-6 
							2xl:-left-6 
							2xl:-right-4'>
				<img src='/pm-logo-blue.png'></img>
			</div>
		);
	}

	return (
		<div className={	`fixed w-1/2 
							lg:w-1/2 
							xl:w-1/2 
							2xl:w-1/2 
							z-50 
							origin-top-left 
							transition-transform 
							duration-250 
							ease-in-out 
							md:-top-2 
							md:-left-0 
							md:-right-2 
							lg:-top-5
							lg:-left-0 
							lg:-right-4
							xl:-top-5 
							xl:-left-0 
							xl:-right-4 
							2xl:-top-5 
							2xl:-left-0 
							2xl:-right-4 

							${scrolled ? 'scale-75' : 'scale-100'}`}>
			<img src='/pm-logo-white.png'></img>
		</div>
	);
}

export default HeaderLogo;

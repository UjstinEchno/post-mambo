import { useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function PersonDetail ({ personinfo, credits, onClose, onPrev, onNext }) {
	useEffect(() => {
		const onKey = (e) => { if (e.key === 'Escape') onClose(); };
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [onClose]);

	const lastAlignRef = useRef(null);
	const align = useCallback(() => {
		const alignArr = ['text-left', 'text-center', 'text-right'];
		const available = alignArr.filter((a) => a !== lastAlignRef.current);
		const next = available[Math.floor(Math.random() * available.length)];
		lastAlignRef.current = next;
		return next;
	}, []);

	const lastBasisRef = useRef(null);
	const randomBasis = useCallback(() => {
		const basisArr = credits.length <= 3
			? ['basis-2/5', 'basis-1/2']
			: ['basis-1/4', 'basis-1/3', 'basis-2/5'];
		const available = basisArr.filter((b) => b !== lastBasisRef.current);
		const next = available[Math.floor(Math.random() * available.length)];
		lastBasisRef.current = next;
		return next;
	}, [credits.length]);

	const lastHeightRef = useRef(null);
	const randomHeight = useCallback(() => {
		const heightArr = ['min-h-16', 'min-h-20', 'min-h-24'];
		const available = heightArr.filter((h) => h !== lastHeightRef.current);
		const next = available[Math.floor(Math.random() * available.length)];
		lastHeightRef.current = next;
		return next;
	}, []);

	const randomOffset = useCallback(
		() => ({
			marginLeft:
				Math.random() < 0.7
					? `${(-(0.25 + Math.random() * 1.25)).toFixed(2)}rem`
					: `${(0.5 + Math.random() * 2.5).toFixed(2)}rem`,
			marginTop: `${(Math.random() * 1.25).toFixed(2)}rem`,
			transform: `rotate(${(Math.random() * 4 - 2).toFixed(2)}deg) scale(${(0.98 + Math.random() * 0.04).toFixed(2)})`,
			zIndex: Math.floor(Math.random() * 10) + 1,
			position: 'relative',
		}),
		[]
	);

	return (
		<div className='fixed inset-0 z-40 flex items-start md:items-center justify-center overflow-y-auto py-20 md:py-10'>
			<div className='fixed inset-0 bg-black/70' onClick={onClose} />

			<div className='relative z-10 w-full max-w-5xl mx-4 mb-28 md:mb-0 rounded-3xl bg-dark border-2 border-white shadow-xl shadow-black/30 p-8 md:p-12'>
				<button
					onClick={onClose}
					aria-label='Close'
					className='absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-silver border-2 border-white shadow-lg shadow-black/30 text-blue font-authenticSans150 text-lg'
				>
					×
				</button>

				<div className='flex items-center gap-4'>
					<img
						src={personinfo.photo}
						className='h-16 w-16 rounded-full object-cover object-top border-2 border-white shadow-lg shadow-black/30 flex-shrink-0'
					/>
					<h1 className='uppercase text-silver font-authenticSans150 text-4xl md:text-6xl leading-none tracking-tight'>
						{personinfo.name}
					</h1>
				</div>

				<p className='text-silver text-lg font-authenticSans130 tracking-tight mt-6'>
					{personinfo.bio}
				</p>

				{credits.length > 0 && (
					<div className='flex flex-wrap gap-2 mt-8'>
						{credits.map((item) => (
							<Link
								key={item.id}
								to={`/projects/${item.id}`}
								style={randomOffset()}
								className={`${align()} ${randomBasis()} ${randomHeight()} rounded-3xl bg-yellowgreen tracking-tight leading-5 flex flex-col justify-center border-2 border-white hover:border-blue transition-colors duration-450 shadow-lg shadow-black/30`}
							>
								<p className='ml-4 mr-4 mt-2 lowercase text-blue font-authenticSans130 text-lg'>{item.title}</p>
								<p className='ml-4 mb-2 mr-4 lowercase text-blue font-authenticSans90 text-lg'>{item.role}</p>
							</Link>
						))}
					</div>
				)}

				<div className='flex justify-center gap-4 mt-10'>
					<button
						onClick={onPrev}
						aria-label='Previous person'
						className='h-12 w-12 rounded-full bg-silver border-2 border-white shadow-lg shadow-black/30 text-blue font-authenticSans150 text-xl'
					>
						←
					</button>
					<button
						onClick={onNext}
						aria-label='Next person'
						className='h-12 w-12 rounded-full bg-silver border-2 border-white shadow-lg shadow-black/30 text-blue font-authenticSans150 text-xl'
					>
						→
					</button>
				</div>
			</div>
		</div>
	);
}

export default PersonDetail;

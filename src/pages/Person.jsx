import FadeImage from './FadeImage';

function Person ({ personinfo, style, onClick }) {
	return (
		<button
			onClick={onClick}
			style={style}
			className='group aspect-[3/4] md:h-[75%] overflow-hidden rounded-3xl border-2 border-white hover:border-yellowgreen transition-colors duration-450 shadow-lg shadow-black/30 text-left'
		>
			<div className='absolute inset-0 h-full w-full overflow-hidden transition-transform duration-300 group-hover:scale-[1.03]'>
				<FadeImage
					src={personinfo.photo}
					width={personinfo.photoWidth}
					height={personinfo.photoHeight}
					decoding='async'
					className='h-full w-full object-cover object-top'
				/>
			</div>
			<div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10'>
				<h2 className='lowercase text-blue font-authenticSans130 text-2xl md:text-3xl tracking-tight bg-yellowgreen'>
					{personinfo.name}
				</h2>
			</div>
		</button>
	);
}

export default Person;

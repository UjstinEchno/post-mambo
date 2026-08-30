import YouTube from 'react-youtube';
import Vimeo from '@u-wave/react-vimeo';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import projects from '../data/projects.json';
import Menu from './Menu';

function shuffle (array) {
	var ctr = array.length,
		temp,
		index;
	while (ctr > 0) {
		index = Math.floor(Math.random() * ctr);
		ctr--;
		temp = array[ctr];
		array[ctr] = array[index];
		array[index] = temp;
	}
	return array;
}

function findProjectById (id) {
	return projects.find((project) => project.id === id);
}

export const colorsArr = ['bg-blue', 'bg-pink', 'bg-olive', 'bg-orange', 'bg-yellowgreen', 'bg-folly', 'bg-vermilion'];

function Project ({ projectinfo: initialProjectInfo, bgColor }) {
	const { id } = useParams();
	const [creditsLaurels, setCreditsLaurels] = useState([]);

	const projectinfo = useMemo(() => initialProjectInfo || findProjectById(id), [initialProjectInfo, id]);

	// Math can't know a coined word's real boundary ("MexicanAmerican" isn't in any
	// dictionary) — so this checks for a manual hint first: insert a zero-width space
	// (U+200B) directly in the title text wherever you want an invisible break point,
	// e.g. "Mexican​American", and the browser handles it natively, no code needed.
	// Only titles WITHOUT a manual hint fall back to a rough midpoint split, which is
	// a safety net (guaranteed no orphaned single letters) rather than a "correct" answer.
	const renderTitle = (title) => {
		if (!title) return title;
		if (title.includes('\u200B')) return title; // manual hint present — let the browser handle it directly

		const words = title.split(' ');
		const longestIndex = words.reduce((maxIdx, word, i) => (word.length > words[maxIdx].length ? i : maxIdx), 0);
		const longestWord = words[longestIndex];

		if (longestWord.length <= 8) return title; // short enough on its own, no hint needed

		const mid = Math.ceil(longestWord.length / 2);
		const firstHalf = longestWord.slice(0, mid);
		const secondHalf = longestWord.slice(mid);

		return words.map((word, i) => (
			<span key={i}>
				{i === longestIndex ? (
					<>
						{firstHalf}
						<wbr />
						{secondHalf}
					</>
				) : (
					word
				)}
				{i < words.length - 1 ? ' ' : ''}
			</span>
		));
	};

	useEffect(() => {
		if (projectinfo) {
			const mountArray = shuffle([...projectinfo.creditslaurels]);
			setCreditsLaurels(mountArray);
			window.scrollTo(0, 0);
		}
	}, [projectinfo]);

	// The "never the same as the previous card" adjacency is computed once, up front,
	// by Projects.jsx across the whole list — an individual card has no reliable way
	// to know its neighbor's color, especially since React (in StrictMode dev) can
	// mount/unmount/remount a card, resetting any local ref-based tracking. When
	// rendered standalone (direct /projects/:id route, no bgColor passed), there's no
	// neighbor to avoid, so just pick once and cache it for the life of this instance.
	const colorRef = useRef(null);
	if (colorRef.current === null) {
		colorRef.current = bgColor || colorsArr[Math.floor(Math.random() * colorsArr.length)];
	}

	const lastAlignRef = useRef(null);

	const align = useCallback(() => {
		const alignArr = ['text-left', 'text-center', 'text-right'];
		const available = alignArr.filter((a) => a !== lastAlignRef.current);
		const next = available[Math.floor(Math.random() * available.length)];
		lastAlignRef.current = next;
		return next;
	}, []);

	/* const alignColCredits = useCallback(() => {
		const colArrCredits = ['col-span-1', 'col-span-2', 'col-span-3', 'col-span-4', 'col-span-5', 'col-span-6', 'col-span-7'];
		return colArrCredits[Math.floor(Math.random() * colArrCredits.length)];
	}, []); [old version of the credit randomizaton - new version below]*/

	const randomOffset = useCallback(() => {
		// On desktop's wide canvas a +3rem nudge is imperceptible; on a ~350px mobile
		// row it's enough to occasionally push a card past the viewport edge (where
		// it gets clipped, since the ancestor is overflow-hidden). Scale the range
		// down below md so the same "collage" effect can't overflow there.
		const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
		const negativeSpan = isMobile ? 0.75 : 1.25;
		const positiveSpan = isMobile ? 1 : 2.5;
		return {
			marginLeft:
				Math.random() < 0.7
					? `${(-(0.25 + Math.random() * negativeSpan)).toFixed(2)}rem` // 70% of the time — real overlap, the norm
					: `${(0.5 + Math.random() * positiveSpan).toFixed(2)}rem`, // 30% of the time — occasional real gap, just enough to break the grid rhythm
			marginTop: `${(Math.random() * 1.25).toFixed(2)}rem`, // 0 to 1.25rem — wider vertical stagger too, so rows don't stack into visual columns
			transform: `rotate(${(Math.random() * 4 - 2).toFixed(2)}deg) scale(${(0.98 + Math.random() * 0.04).toFixed(2)})`, // -2 to 2deg, 0.98 to 1.02 — noticeable rotation, still subtle scale
			zIndex: Math.floor(Math.random() * 10) + 1,
			position: 'relative',
		};
	}, []);

	const lastBasisRef = useRef(null);

	const totalCreditCount = (projectinfo?.creditspriority?.length || 0) + creditsLaurels.length;

	const randomBasis = useCallback(() => {
		// Few total credits+laurels → bigger cards, so overlap alone fills the row naturally.
		// Many total → smaller, more varied cards, packed left with everything else.
		const basisArr =
			totalCreditCount <= 3
				? ['basis-2/5', 'basis-1/2']
				: ['basis-1/5', 'basis-1/4', 'basis-1/4', 'basis-1/3'];
		const available = basisArr.filter((b) => b !== lastBasisRef.current);
		const next = available[Math.floor(Math.random() * available.length)];
		lastBasisRef.current = next;
		return next;
	}, [totalCreditCount]);

	// Always pack left rather than switching to justify-between at higher counts —
	// justify-between only looks at each individual row's item count, not the total,
	// so a dense page can still wrap into a thin 2-item row and get a big forced gap.
	// A slightly uneven right edge reads as intentional (collage-like) rather than broken.

	const lastHeightRef = useRef(null);

	// Deliberate height variety, independent of whether the role text happens to wrap.
	// min-h is a floor only — it can never clip content, unlike the old max-h approach.
	const randomHeight = useCallback(() => {
		const heightArr = ['min-h-8 md:min-h-16', 'min-h-10 md:min-h-20', 'min-h-12 md:min-h-24', 'min-h-14 md:min-h-28'];
		const available = heightArr.filter((h) => h !== lastHeightRef.current);
		const next = available[Math.floor(Math.random() * available.length)];
		lastHeightRef.current = next;
		return next;
	}, []);

	if (!projectinfo) {
		return <div>Project not found</div>;
	}

	return (
		<>
		{id && <Menu />}
			<div className={`overflow-hidden ${colorRef.current} design shrink-0 md:shrink-0 mx-4 md:mx-8`}>
				<div className='inline-block mt-20 md:mt-36'>
					<div className='grid grid-cols-8 gap-4 ml-0 mr-0 mb-20'>

						{/* Left: poster */}
							<div className='col-start-1 col-span-8 lg:col-span-4 xl:col-span-4 2xl:col-span-4 ml-0 md:ml-4'>
								{projectinfo.image ? (
									<img
										src={projectinfo.image}
										width={projectinfo.imageWidth}
										height={projectinfo.imageHeight}
										loading='eager'
										fetchpriority='high'
										decoding='async'
										className='rounded-2xl border-1 border-white shadow-xl shadow-black/30'
									/>
								) : null}
							</div>

						{/* Right */}
							<div className='col-start-1 col-span-8 lg:col-span-4 xl:col-span-4 2xl:col-span-4 sm:mt-6 md:mt-6'>
								<div className='mr-0 md:mr-4'>
									<h1
										lang='en'
										className='text-right md:-ml-24 uppercase text-silver text-5xl md:text-10xl lg:text-10xl xl:text-10xl 2xl:text-10xl break-words [hyphens:auto] font-authenticSans150 leading-[0.85] bg-darkyellow rotate-[.08rad]'> {/* title tilt effect bg-darkyellow rotate-[.08rad]*/}
										{renderTitle(projectinfo.title)}
									</h1>

									{/* Sub-grid for credits */}
										<div className='flex flex-wrap justify-center md:justify-end gap-2'>
											{projectinfo.creditspriority.map((item) => (
												<div
													key={item.name}
													style={randomOffset()}
													className={`${align()} ${randomBasis()} ${randomHeight()} rounded-3xl bg-silver text-silver tracking-tight leading-5 flex flex-col align-middle break-words border-2 border-white shadow-lg shadow-black/30`}>
														<div className='m-auto align-middle'>
															<p className='ml-4 mr-4 mt-2 text-blue font-authenticSans150 text-[9px] md:text-lg'>{item.name}</p>
															<p className='ml-4 mb-2 mr-4 text-blue font-authenticSans90 text-[9px] md:text-lg'>{item.role}</p>
												</div>
											</div>
												))}

												{creditsLaurels.map((item) => {
													if (item.type === 'credit') {
														return (
															<div
																key={item.name}
																style={randomOffset()}
																className={`${align()} ${randomBasis()} ${randomHeight()} rounded-3xl bg-silver text-silver tracking-tight leading-5 flex flex-col align-middle break-words border-2 border-white shadow-lg shadow-black/30`}>
																<div className='m-auto align-middle'>
																	<p className='ml-4 mr-4 mt-2 text-blue font-authenticSans150 text-[9px] md:text-lg'>
																		{item.name}
																	</p>
																	<p className='ml-4 mb-2 mr-4 text-blue font-authenticSans90 text-[9px] md:text-lg'>
																		{item.role}
																	</p>
																</div>
															</div>
														);
													} else if (item.type === 'laurel') {
														return (
															<div
																key={item.image}
																style={randomOffset()}>
																<img
																src={item.image}
																loading='lazy'
																decoding='async'
																className='max-h-16 md:max-h-32 w-auto'
															/>
															</div>
														);
													}
												})}
											</div>

								{/* description*/}

								<p className='mt-4 text-silver text-center md:text-justify text-xl font-authenticSans130 tracking-tighter [text-shadow:0_0_10px_#fff]'>  {/* bg-amber */}
									{projectinfo.description}
								</p>

								{/* quote */}
								
								<div className='quote mt-4 mb-5 text-silver text-center md:text-justify text-xl font-authenticSansCondensed90 rounded-2xl bg-silver tracking-tighter'>
									{projectinfo.pressquotes.map((quote) => (
										<p key={quote.quote} className='inline-block m-4 text-blue'>
											{quote.quote} <span>- {quote.publication}</span>
										</p>
									))}
								</div>
								{projectinfo.videos[0].source === 'youtube' && (
									<YouTube
										videoId={projectinfo.videos[0].id}
										opts={{
											height: '450',
											width: '100%',
										}}
										containerClassName={'youtubeContainer'}
									/>
								)}

								{projectinfo.videos[0].source === 'vimeo' && (
									<Vimeo
										video={projectinfo.videos[0].id}
										height='450'
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Project;

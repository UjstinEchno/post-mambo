import Vimeo from '@u-wave/react-vimeo';
import Menu from './Menu';

function Home () {
	return (
		<>
			<Menu />
			<div className='relative w-screen h-screen overflow-hidden bg-silver flex items-center justify-center'>
				<div className='relative w-[75vw] h-[75vh] overflow-hidden rounded-2xl border-2 border-white shadow-xl shadow-black/30'>
					<div
						className='reel-video absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
						style={{ width: 'max(75vw, calc(75vh * 16 / 9))', height: 'max(calc(75vw * 9 / 16), 75vh)' }}>
						<Vimeo
								video='902728728'
								muted
								background
								loop
								width={1920}
								height={1080}
								className='w-full h-full'
						/>
					</div>
				</div>
				<div className='z-10 max-[640px]:hidden absolute right-8 mt-[340px] w-1/4 rounded-xl bg-silver text-blue tracking-tight p-8 font-authenticSans90 text-2xl border-2 border-white shadow-xl shadow-black/30'>
					<div>
						<span className='w-1/2'>
							<img
								className='w-1/3 float-left mr-4'
								src='/pm-logo-blue.png'
								width={2160}
								height={556}
								loading='eager'
								decoding='async'
							/>
						</span>
						<p className='-mt-5 my-2'>
							is an award-winning Los Angeles and Chicago based
							post-production company.
						</p>
					</div>
					<span className='my-2'>
						We specialize in edit, sound and score for feature films, docs,
						and commercials.
					</span>
				</div>
			</div>
		</>
	);
}

export default Home;

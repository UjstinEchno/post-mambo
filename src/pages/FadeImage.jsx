import { useEffect, useRef, useState } from 'react';

function FadeImage ({ className = '', onLoad, ...imgProps }) {
	const [loaded, setLoaded] = useState(false);
	const imgRef = useRef(null);

	useEffect(() => {
		setLoaded(imgRef.current?.complete ?? false);
	}, [imgProps.src]);

	return (
		<img
			ref={imgRef}
			onLoad={(e) => {
				setLoaded(true);
				onLoad?.(e);
			}}
			className={`transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
			{...imgProps}
		/>
	);
}

export default FadeImage;

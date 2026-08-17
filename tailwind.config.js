/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		screens: {
			xs: '475px',
			...defaultTheme.screens,
		},
		colors: {
			white: '#ffffff',
			silver: '#E8EBF7',
			yellow: '#fefec0',
			periwinkle: '#cdc7e5',
			snow: '#daffef',
			blue: '#0074EC',
			pink: '#E45978',
			orange: '#F97854',
			olive: '#8F943A',
			navy: '#0E3570',
			green: '#4e6f21',
			yellowgreen: '#8fc93a',
			gray: '#818479',
			amber: '#fea82f',
			black: '#000015',
			folly: '#ff1053',
			vermilion: '#f64740',
			dark: '#232323',
			darkyellow: '#E4CC36',
		},
		fontFamily: {
			authenticSans60: ['"AUTHENTIC Sans 60"'],
			authenticSans90: ['"AUTHENTIC Sans 90"'],
			authenticSans130: ['"AUTHENTIC Sans 130"'],
			authenticSans150: ['"AUTHENTIC Sans 150"'],
			authenticSansCondensed60: ['"AUTHENTIC Sans Condensed 60"'],
			authenticSansCondensed90: ['"AUTHENTIC Sans Condensed 90"'],
			authenticSansCondensed130: ['"AUTHENTIC Sans Condensed 130"'],
			authenticSansCondensed150: ['"AUTHENTIC Sans Condensed 150"'],
			picnic: ['"PicNic-Regular"'],
		},
		fontSize: {
			...defaultTheme.fontSize,
			'10xl': '10rem',
			'11xl': '12rem',
		},
	},
	plugins: [],
};

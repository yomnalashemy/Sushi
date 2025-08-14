import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#f8f5ff',
					100: '#efe7ff',
					200: '#e0d0ff',
					300: '#c1a3ff',
					400: '#a377ff',
					500: '#874BFF',
					600: '#6f3bcc',
					700: '#582f9f',
					800: '#422473',
					900: '#2c1847',
				},
				secondary: {
					50: '#fff5f8',
					100: '#ffe6ee',
					200: '#ffc9dc',
					300: '#ff9ac1',
					400: '#ff66a3',
					500: '#ff2d82',
					600: '#cc1966',
					700: '#990f4b',
					800: '#660a32',
					900: '#330417',
				},
				accent: '#38bdf8',
				muted: '#94a3b8',
				background: '#0b0b14',
				card: '#121223'
			},
			fontFamily: {
				sans: [	'Inter', ...fontFamily.sans ],
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-6px)' }
				},
				shimmer: {
					'0%': { backgroundPosition: '-700px 0' },
					'100%': { backgroundPosition: '700px 0' }
				}
			},
			animation: {
				float: 'float 6s ease-in-out infinite',
				shimmer: 'shimmer 2s linear infinite'
			}
		}
	},
	plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')]
};

export default config;
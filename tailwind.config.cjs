/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {

			colors: {
				'arco_border': 'rgba(229,230,235)'
			}
		},
	},
	plugins: [],
}

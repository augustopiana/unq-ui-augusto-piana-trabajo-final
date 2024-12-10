/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	  ],
	 theme: {
    extend: {
      colors: {
		customPink:"#B7887D",
      }
    },
  },
	plugins: [],
};

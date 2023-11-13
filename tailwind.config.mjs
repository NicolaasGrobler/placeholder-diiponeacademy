/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Montserrat"'],
      },
	  colors: {
		'primary': '#183177',
		'secondary': '#F38340'
	  }
    },
  },
  plugins: [],
};

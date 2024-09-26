/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      screens: {
        'xs': '0px',  // Custom breakpoint for extra small screens
        'sm': '414px',  // Default small breakpoint
        'md': '744px',  // Default medium breakpoint
        'lg': '936px', // Default large breakpoint
        'xl': '1280px', // Default extra large breakpoint
        '2xl': '1536px', // Default 2xl breakpoint
        // Add any other custom breakpoints you need
      },
    },
  },
  plugins: [],
}


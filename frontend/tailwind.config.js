/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
   "./src/**/*.{js,jsx,ts,tsx}",
  ],
  
  theme: {
    extend: {
      colors: {
        primary: "#007bff",
        danger: "#dc3545",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "0.625rem", 
          lg: "1.25rem",  
        },
      }, // end container
    },
  },

  plugins: [],
  important: true,
};

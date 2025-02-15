/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A66C2',    // LinkedIn blue
        secondary: '#004182',  // Darker blue for contrast
        background: '#F3F2EF', // Light gray background
        textPrimary: '#000000',
        textSecondary: '#666666',
        accent: {
          light: '#70B5F9',    // Light blue for highlights
          DEFAULT: '#0A66C2',  // Same as primary
          dark: '#004182',     // Same as secondary
        },
        success: '#057642',    // Green for success states
        error: '#CC1016',      // Red for error states
        warning: '#C37D16',    // Orange for warning states
        linkBlue: '#0077B5',   // LinkedIn link color
      },
    },
  },
  plugins: [],
}

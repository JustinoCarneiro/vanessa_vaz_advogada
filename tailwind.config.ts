import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'teal-dark': '#3D5C5F',
        'teal-mid': '#89B0AF',
        'mint': '#BDE4DA',
        'teal-hover': '#2F484B',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Cormorant Garamond', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Montserrat', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
      },
    },
  },
  plugins: [],
}

export default config

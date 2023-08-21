import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        bubblegum: '#fce0f6',
        darkblue: '#212d63',
        ninetyfive: '#c1c9d2',
        night: '#1a1f36',
        blurple: '#635bff',
        paleblurple: '#7a73ff',
        stripeamber: '#ffbb00',
        stripemagenta: '#ff80ff',
        stripecyan: '#80e9ff'
      },
    },
  },
  darkMode: "class",
  plugins: [],
}
export default config

import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    screens: {
      'sm': '576px',
      'md': '720px',
      'lg': '960px',
      'xl': '1128px',
      '2xl': '2225px',
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        'sm': '576px',
        'md': '720px',
        'lg': '960px',
        'xl': '1128px',
        '2xl': '2225px',
      },
    },
  },
}

export default config


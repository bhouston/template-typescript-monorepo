/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,tsx,ts}',
    '../../packages/react-lib/src/**/*.{html,js,tsx,ts}'
  ],
  theme: {},
  plugins: [
    {
      tailwindcss: {}
    },
    {
      autoprefixer: {}
    }
  ]
};

export default {
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

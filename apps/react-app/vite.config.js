export default {
  server: {
    port: 4000,
    proxy: {
      '/api': 'http://localhost:4001'
    },
    host: '0.0.0.0' // allow external connections
  }
};

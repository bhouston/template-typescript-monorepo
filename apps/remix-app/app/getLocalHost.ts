const localHost = 'http://localhost:3000';

export const getPort = () => {
  // https://fastify.dev/docs/latest/Guides/Serverless/#google-cloud-run
  // Google Cloud Run will set this environment variable for you, so
  // you can also use it to detect if you are running in Cloud Run
  const IS_GOOGLE_CLOUD_RUN = process.env.K_SERVICE !== undefined;
  // You must listen on the port Cloud Run provides
  const port = process.env.PORT !== undefined ? Number(process.env.PORT) : 3000;
  return port;
};

export const getHost = () => {
  // https://fastify.dev/docs/latest/Guides/Serverless/#google-cloud-run
  // Google Cloud Run will set this environment variable for you, so
  // you can also use it to detect if you are running in Cloud Run
  const IS_GOOGLE_CLOUD_RUN = process.env.K_SERVICE !== undefined;
  // You must listen on all IPV4 addresses in Cloud Run
  const host = IS_GOOGLE_CLOUD_RUN ? '0.0.0.0' : '127.0.0.1';
  return host;
};

export const getFullHost = () => {
  return `http://${getHost()}:${getPort()}`;
};

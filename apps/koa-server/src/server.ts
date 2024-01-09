import 'source-map-support/register.js'; // required for cross platform source map support, other options didn't work across OSes.

import { getApp } from './app.js';
import { closeGracefully } from './utils/closeGracefully.js';
import { config } from './utils/getConfig.js';

export const main = async () => {
  console.log(`${config.NAME}: ${config.VERSION}`);

  const app = getApp({ logging: true, cors: true, compress: true });

  const server = app.listen(config.PORT, () => {
    console.log(`   Server: http://localhost:${config.PORT}`);
  });

  closeGracefully(server);
};

main();

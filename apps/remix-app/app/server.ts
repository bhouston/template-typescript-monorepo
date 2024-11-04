import sourceMapSupport from 'source-map-support';

import app from './buildFastify.ts';
import { getHost, getPort } from './getLocalHost.ts';

sourceMapSupport.install();

const address = await app.listen({ port: getPort(), host: getHost() });

console.log(`✅ app ready: ${address}`);

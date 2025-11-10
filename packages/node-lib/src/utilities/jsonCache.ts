'use server';
import { Storage } from '@google-cloud/storage';
import { config } from 'dotenv';

import { objectToMd5Hash } from './md5Hash.js';

config();

const storage = new Storage();

type CacheEntry = {
  timeStamp: number;
  data: unknown; // should be JSON
};

const rootHash = {
  dbName: '',
};

const dbName = process.env.DB_DATABASE;
if (dbName === undefined) {
  throw new Error('DB_DATABASE is undefined');
}
rootHash.dbName = dbName;

const bucket = storage.bucket('ben-query-cache');

const memoryCache: Record<string, CacheEntry> = {};

export async function internalJsonCache(
  name: string,
  description: Record<string, object>,
  cacheExpiration: number,
  creator: () => Promise<object>,
): Promise<object> {
  const currentTimestamp = Date.now();

  const descriptionHash = objectToMd5Hash({ ...description, rootHash });

  const cacheKey = `${name}-${descriptionHash}`;
  const prefix = `[jsonCache] ${name} `;

  const cacheEntry = memoryCache[cacheKey];

  if (cacheEntry) {
    if (currentTimestamp - cacheEntry.timeStamp <= cacheExpiration) {
      console.log(`${prefix} memoryCache HIT ${Date.now() - currentTimestamp} ms`);
      return cacheEntry.data;
    }
  }
  //console.log(`${prefix} memoryCache MISS`);

  const file = bucket.file(cacheKey);

  // Check if the cached file exists in the bucket (could I optimize this by just trying to download first?)
  const [fileExists] = await file.exists();
  if (!fileExists) {
    //console.log(`${prefix} fileCache MISS`);

    // If the cached file exists but has expired, start updating the data in the background

    console.log(`${prefix} creator FETCH`);
    const createJson = await creator();
    const creatorString = JSON.stringify(createJson);

    file.save(creatorString, { contentType: 'application/json' });

    console.log(`${prefix} creator FETCH ${Date.now() - currentTimestamp} ms`);

    const newCacheEntry: CacheEntry = {
      timeStamp: currentTimestamp,
      data: createJson,
    };
    memoryCache[cacheKey] = newCacheEntry;

    return createJson;
  }

  // download file and serve it.
  const [content] = await file.download();
  const downloadJson = JSON.parse(content.toString()) as object;
  console.log(`${prefix} fileCache HIT: ${Date.now() - currentTimestamp} ms`);

  // Check if cached file has expired

  file
    .getMetadata()
    .then(([metadata]) => {
      const metadataTimestamp = metadata.updated !== undefined ? Date.now() : undefined;

      const isExpired =
        metadataTimestamp !== undefined ? currentTimestamp - metadataTimestamp > cacheExpiration : false;

      if (isExpired) {
        //console.log(`${prefix} fileCache EXPIRED`);
        // If the cached file expired, update with latest query data
        console.log(`${prefix} creator REVALIDATE`);
        void creator().then((createJson) => {
          console.log(`${prefix} creator REVALIDATE ${Date.now() - currentTimestamp} ms`);
          const downloadString = JSON.stringify(createJson);
          return file.save(downloadString, { contentType: 'application/json' }).then(() => {
            const newMemoryCacheEntry: CacheEntry = {
              timeStamp: Date.now(),
              data: createJson,
            };
            memoryCache[cacheKey] = newMemoryCacheEntry;
          });
        });
      }

      // If the cached file has not expired, update the memory cache
      else if (metadataTimestamp !== undefined) {
        const newMemoryCacheEntry: CacheEntry = {
          timeStamp: metadataTimestamp,
          data: downloadJson,
        };
        memoryCache[cacheKey] = newMemoryCacheEntry;
      }

      return downloadJson;
    })
    .catch((err) => {
      console.error(err);
    });

  return downloadJson;
}

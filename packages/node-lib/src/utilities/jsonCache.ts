'use server';
import { Storage } from '@google-cloud/storage';
import { profile } from '@threekit/diagnostics';
import { config } from 'dotenv';

import { objectToMd5Hash } from '../utils/hashes';

config();

const storage = new Storage();

type CacheEntry = {
  timeStamp: number;
  data: any;
};

const rootHash = {
  dbName: ''
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
  description: Record<string, any>,
  cacheExpiration: number,
  creator: () => Promise<any>
): Promise<any> {
  const currentTimestamp = new Date().getTime();

  const descriptionHash = objectToMd5Hash({ ...description, rootHash });

  const cacheKey = `${name}-${descriptionHash}`;
  const prefix = `[jsonCache] ${name} `;

  const cacheEntry = memoryCache[cacheKey];
  if (cacheEntry !== undefined) {
    if (currentTimestamp - cacheEntry.timeStamp <= cacheExpiration) {
      console.log(
        `${prefix} memoryCache HIT ${Date.now() - currentTimestamp} ms`
      );
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
    const data = await creator();
    const content = JSON.stringify(data);
    file.save(content, { contentType: 'application/json' });
    console.log(`${prefix} creator FETCH ${Date.now() - currentTimestamp} ms`);

    memoryCache[cacheKey] = {
      timeStamp: currentTimestamp,
      data
    } as CacheEntry;

    return data;
  }

  // download file and serve it.
  const [content] = await file.download();
  const data = JSON.parse(content.toString());
  console.log(`${prefix} fileCache HIT: ${Date.now() - currentTimestamp} ms`);

  // Check if cached file has expired
  file.getMetadata().then(([metadata]) => {
    const metadataTimestamp = metadata.updated
      ? new Date(metadata.updated).getTime()
      : null;

    const isExpired = metadataTimestamp
      ? currentTimestamp - metadataTimestamp > cacheExpiration
      : false;

    if (isExpired) {
      //console.log(`${prefix} fileCache EXPIRED`);
      // If the cached file expired, update with latest query data
      console.log(`${prefix} creator REVALIDATE`);
      profile(name, creator).then((data) => {
        const content = JSON.stringify(data);
        memoryCache[cacheKey] = {
          timeStamp: new Date().getTime(),
          data
        } as CacheEntry;
        console.log(
          `${prefix} creator REVALIDATE ${Date.now() - currentTimestamp} ms`
        );
        file.save(content, { contentType: 'application/json' });
        return data;
      });
    } else {
      memoryCache[cacheKey] = {
        timeStamp: metadataTimestamp,
        data
      } as CacheEntry;
    }
    return data;
  });

  return data;
}

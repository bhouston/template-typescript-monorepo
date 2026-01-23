import axios, { type AxiosInstance } from 'axios';
import type * as z from 'zod';

export type ApiAuthType = 'anonymous';

export type ApiAuthAnonymous = {
  authType: 'anonymous';
};

export type ApiAuth = ApiAuthAnonymous;

export type ApiClient = {
  axios: AxiosInstance;
  host: string;
  auth: ApiAuth;
  validateResults?: boolean;
};

export class ClientFetchError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

const validateHost = (host: string) => {
  if (!host.includes('://')) {
    throw new Error(`host must include protocol, either http:// or https://, but it doesn't: ${host}`);
  }
};

export type CreateAnonymousClientParams = {
  host: string;
};

export const createAnonymousClient = ({ host }: CreateAnonymousClientParams): ApiClient => {
  validateHost(host);

  return {
    axios: axios.create({
      baseURL: host,
    }),
    host,
    auth: {
      authType: 'anonymous',
    },
  };
};

/**
 * Conditionally parses API response data using a zod schema.
 * If client.validateResults is true, validates and parses the data.
 * Otherwise, returns the data with a type assertion based on the schema's inferred type.
 *
 * @param client - The API client instance
 * @param schema - The zod schema to use for validation/type inference
 * @param data - The raw response data to parse
 * @returns The parsed or type-asserted data matching the schema's inferred type
 */
export const parseResult = <T extends z.ZodTypeAny>(_client: ApiClient, schema: T, data: unknown): z.infer<T> =>
  schema.parse(data);

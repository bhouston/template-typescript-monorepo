import * as z from 'zod';

export const listResultSchema = <T extends z.ZodTypeAny>(item: T) =>
  z.strictObject({
    rows: z.array(item),
    rowCount: z.int().min(0),
  });

export type ListResult<T> = {
  rows: T[];
  rowCount: number;
};

export const paginationSchema = z.object({
  pageOffset: z.coerce
    .number()
    .int()
    .min(0)
    .default(0)
    .describe('The number of items to skip before starting to return results. Must be 0 or greater.'),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(1000)
    .default(50)
    .describe('The maximum number of items to return. Must be between 1 and 1000.'),
});
export type Pagination = z.infer<typeof paginationSchema>;

export const paginationOptionalSchema = z.object({
  pageOffset: z.coerce
    .number()
    .int()
    .min(0)
    .optional()
    .describe('The number of items to skip before starting to return results. Must be 0 or greater.'),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(1000)
    .optional()
    .describe('The maximum number of items to return. Must be between 1 and 1000.'),
});
export type PaginationOptional = z.infer<typeof paginationOptionalSchema>;

export const sortDirEnum = z.enum(['asc', 'desc']).describe('The direction to sort by. Must be "asc" or "desc".');
export type SortDir = z.infer<typeof sortDirEnum>;

export const sortingSchema = z.object({
  sortBy: z.string().max(256),
  sortDir: sortDirEnum.default('desc'),
});
export type Sorting<TField extends string = string> = {
  sortBy: TField;
  sortDir: SortDir;
};

export const sortingOptionalSchema = z.object({
  sortBy: z.string().max(256).optional().describe('The field to sort by.'),
  sortDir: sortDirEnum.optional().describe('The direction to sort by. Must be "asc" or "desc".'),
});
export type SortingOptional = z.infer<typeof sortingOptionalSchema>;

export const createSortingSchema = <const TField extends string>(fields: readonly [TField, ...TField[]]) =>
  z.object({
    sortBy: z.enum(fields).describe('The field to sort by'),
    sortDir: sortDirEnum.default('desc').describe('The direction to sort by'),
  });

export const createSortingOptionalSchema = <const TField extends string>(fields: readonly [TField, ...TField[]]) =>
  z.object({
    sortBy: z.enum(fields).optional().describe('The field to sort by'),
    sortDir: sortDirEnum.optional().describe('The direction to sort by'),
  });

export type SortingFromFields<TFields extends readonly string[]> = Sorting<TFields[number]>;

import * as z from 'zod';

// Common entity name schemas
// Entity name regex pattern:
// - First character must be a-zA-Z (letter, uppercase or lowercase)
// - Following characters can be a-zA-Z, 0-9, or dash (-)
// - No consecutive dashes (-) allowed
// - No trailing dashes (-) allowed
export const entityNameRegex = /^[a-zA-Z][a-zA-Z0-9]*(?:-[a-zA-Z0-9]+)*$/;

export const entityNameSchema = (description: string) =>
  z
    .string()
    .min(1, 'Name is required')
    .max(30, 'Name must be at most 30 characters')
    .regex(
      entityNameRegex,
      'Name must start with a letter and can only contain letters, numbers, and dashes (-). No consecutive or trailing dashes (-) allowed.',
    )
    .describe(description);

export const userNameSchema = entityNameSchema('The name of the user');

export const userNameParamsSchema = z.strictObject({
  userName: userNameSchema,
});
export type UserNameParams = z.infer<typeof userNameParamsSchema>;

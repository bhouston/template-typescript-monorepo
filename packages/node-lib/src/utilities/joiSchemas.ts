import Joi from 'joi';

export const uuidSchema = Joi.string().guid({ version: 'uuidv4' });
export const hexColorSchema = Joi.string().regex(/^([\dA-Fa-f]{8})$/);

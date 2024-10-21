import { JSONSchema } from 'objection';

export const UserValidation: JSONSchema = {
  type: 'object',
  title: 'User Schema Validation',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
  },
};

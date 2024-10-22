import { JSONSchema } from 'objection';

export const UserValidation: JSONSchema = {
  type: 'object',
  title: 'User Schema Validation',
  required: ['email'],
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
    registration_provider: { type: 'string' },
  },
};

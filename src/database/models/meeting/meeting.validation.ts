import { JSONSchema } from 'objection';

export const MeetingValidation: JSONSchema = {
  type: 'object',
  title: 'Meeting Schema Validation',
  required: ['name', 'user_id'],
  properties: {
    name: { type: 'string' },
    user_id: { type: 'string' },
    token: { type: 'string' },
  },
};

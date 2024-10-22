import { JSONSchema } from 'objection';

export const MeetingValidation: JSONSchema = {
  type: 'object',
  title: 'Meeting Schema Validation',
  required: ['link', 'name', 'user_id'],
  properties: {
    link: { type: 'string' },
    name: { type: 'string' },
    user_id: { type: 'number' },
  },
};

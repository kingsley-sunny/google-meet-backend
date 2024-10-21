import { JSONSchema } from 'objection';

export const ChatValidation: JSONSchema = {
  type: 'object',
  title: 'Chat Schema Validation',
  required: ['meeting_id', 'message'],
  properties: {
    meeting_id: { type: 'number' },
    user_id: { type: 'number' },
    temporary_user_id: { type: 'string' },
    message: { type: 'string' },
    user_name: { type: 'string' },
  },
};

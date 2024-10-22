import { JSONSchema } from 'objection';

export const MeetingUserValidation: JSONSchema = {
  type: 'object',
  title: 'MeetingUser Schema Validation',
  required: ['meeting_id', 'meeting_token'],
  properties: {
    meeting_id: { type: 'number' },
    user_id: { type: 'number' },
    name: { type: 'string' },
    meeting_token: { type: 'string' },
    temporary_user_id: { type: 'string' },
  },
};

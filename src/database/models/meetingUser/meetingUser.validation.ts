import { JSONSchema } from 'objection';

export const MeetingUserValidation: JSONSchema = {
  type: 'object',
  title: 'MeetingUser Schema Validation',
  required: ['meeting_id', 'status'],
  properties: {
    meeting_id: { type: 'string' },
    name: { type: 'string' },
    status: { type: 'string' },
  },
};

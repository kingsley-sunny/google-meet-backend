import { JSONSchema } from 'objection';

export const MeetingRequestValidation: JSONSchema = {
  type: 'object',
  title: 'MeetingRequest Schema Validation',
  required: ['meeting_id', 'status'],
  properties: {
    meeting_id: { type: 'string' },
    user_id: { type: 'string' },
    status: { type: 'string' },
    name: { type: 'string' },
  },
};

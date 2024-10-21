import { JSONSchema } from 'objection';

export const MeetingInviteValidation: JSONSchema = {
  type: 'object',
  title: 'MeetingInvite Schema Validation',
  required: ['meeting_id', 'status'],
  properties: {
    meeting_id: { type: 'number' },
    user_id: { type: 'number' },
    status: { type: 'string' },
    name: { type: 'string' },
  },
};

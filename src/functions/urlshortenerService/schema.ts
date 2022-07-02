export default {
  type: "object",
  properties: {
    email: { type: 'string' },
    urls: { type: 'array', items: { type: 'string'}},
  },
  required: ['email','urls']
} as const;

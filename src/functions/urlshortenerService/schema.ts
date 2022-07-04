export default {
  type: "object",
  properties: {
    mail: { type: 'string' },
    urls: { type: 'array', items: { type: 'string'}},
  },
  required: ['mail','urls']
} as const;

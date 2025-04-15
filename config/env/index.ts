import { z } from 'zod';

const schema = z.object({
  DATABASE_URL: z.string(),
  TOKEN: z.string(),
  TESTSERVER: z.string(),
  PREFIX: z.string().default('!'),
});

export const env = schema.parse(process.env);

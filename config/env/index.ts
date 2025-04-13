import { z } from "zod";

const schema = z.object({
	BASE_URL: z.string(),
	DATABASE_URL: z.string(),

	PRIVACY_KEY: z.string(),
	PRIVACY_SALT: z.string(),

	AWS_REGION: z.string(),
	AWS_ACCESS_KEY_ID: z.string(),
	AWS_SECRET_ACCESS_KEY: z.string(),
	AWS_S3_BUCKET_NAME: z.string(),
});

export const env = schema.parse(process.env);

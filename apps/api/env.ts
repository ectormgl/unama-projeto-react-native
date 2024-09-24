import { z } from "zod"

const envVariables = z.object({
    DATABASE_URL: z.string().min(1),
    API_URL: z.string().url().optional(),
    AUTH_GOOGLE_ID: z.string().optional(),
    AUTH_GOOGLE_SECRET: z.string().optional(),
    NODE_ENV: z.enum(["development", "production"]).optional(),
})

envVariables.parse(process.env)

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envVariables> {}
    }
}
import { createTRPCRouter } from "../index.ts"
import { authRouter } from "./auth.ts"
import {transactionRouter} from "./transaction.ts"
export const appRouter = createTRPCRouter({
    auth: authRouter,
    transaction: transactionRouter,
})

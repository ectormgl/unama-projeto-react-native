import { eq, sql } from "drizzle-orm"
import { z } from "zod"
import { db } from "../../database/client.ts"
import { recyclingTransactions, User } from "../../database/schema.ts"
import { protectedProcedure, publicProcedure } from "../index.ts"

export const transactionRouter = {
    addRecyclingTransaction: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                weight: z.number(),
            }),
        )
        .mutation(async ({ input }) => {
            const user = await db.query.User.findFirst({
                where: (user) => eq(user.id, input.userId),
            })

            if (user?.userType !== "normal") {
                throw new Error("Apenas usuários normais podem enviar pontos.")
            }
            const pointsEarned = input.weight * 10
            await db.insert(recyclingTransactions).values({
                userId: input.userId,
                weight: input.weight,
                points: pointsEarned,
            })

            await db
                .update(User)
                .set({
                    totalPoints: sql`${User.totalPoints} + ${pointsEarned}`,
                })
                .where(eq(User.id, input.userId))
        }),

    addMoneyToCooperative: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                amount: z.number(),
            }),
        )
        .mutation(async ({ input }) => {
            const user = await db.query.User.findFirst({
                where: (user) => eq(user.id, input.userId),
            })

            if (user?.userType !== "cooperative") {
                throw new Error(
                    "Apenas cooperativas podem enviar dinheiro para ganhar pontos.",
                )
            }
            const pointsEarned = input.amount * 20
            await db
                .update(User)
                .set({
                    totalPoints: sql`${User.totalPoints} + ${pointsEarned}`,
                })
                .where(eq(User.id, input.userId))
            return { success: true, pointsEarned }
        }),

    // Consultar pontos de um usuário
    getUserPoints: protectedProcedure.query(async ({ ctx }) => {
        const user = await db.query.User.findFirst({
            where: (user) => eq(user.id, ctx.session.user.id),
        })

        return {
            points: user?.totalPoints || 0,
            canRedeemRewards: user?.canRedeemRewards,
        }
    }),
}

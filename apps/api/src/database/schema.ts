import { relations } from "drizzle-orm"
import { pgTable, text, timestamp, uuid, boolean, integer, serial, date } from "drizzle-orm/pg-core"

export const User = pgTable("user", {
    id: uuid("id").primaryKey().defaultRandom(),
    fullName: text("full_name").notNull(),
    email: text("email").notNull().unique(),
    hashedPassword: text("hashed_password"),
    userType: text("user_type", ).notNull(), // 'normal' ou 'cooperative'
    totalPoints: integer("total_points").default(0),
    canRedeemRewards: boolean("can_redeem_rewards").default(true),
})
export type User = typeof User.$inferSelect

export type OAuthAccountProvider = "google" | "apple" | "facebook"

export const OAuthAccount = pgTable("oauth_account", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
        .notNull()
        .references(() => User.id),
    provider: text("provider").$type<OAuthAccountProvider>().notNull(),
    providerUserId: text("provider_user_id").notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date",
    }).notNull(),
})
export const OAuthAccountRelations = relations(OAuthAccount, ({ one }) => ({
    user: one(User, { references: [User.id], fields: [OAuthAccount.userId] }),
}))

export const UserRelations = relations(User, ({ many }) => ({
    sessions: many(Session),
    accounts: many(OAuthAccount),
}))

export const Session = pgTable("session", {
    id: text("id").primaryKey(),
    userId: uuid("user_id")
        .notNull()
        .references(() => User.id),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date",
    }).notNull(),
})


export const userTypes = ['normal', 'cooperative'] as const;


  
  // Definir a tabela de transações de reciclagem
export const recyclingTransactions = pgTable("recycling_transactions", {
    id: serial("id").primaryKey(),
    userId:  uuid("id").primaryKey()
      .references(() => User.id)
      .notNull(),
    weight: integer("weight").notNull(), // Peso dos resíduos reciclados
    points: integer("points").notNull(), // Pontos ganhos
    transactionDate: date("transaction_date").defaultNow(), // Data da transação
  });


export type Session = typeof Session.$inferSelect

export const SessionRelations = relations(Session, ({ one }) => ({
    user: one(User, { references: [User.id], fields: [Session.userId] }),
}))

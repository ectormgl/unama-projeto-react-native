import { relations } from "drizzle-orm"
import { pgTable, text, timestamp, uuid, boolean, integer, serial } from "drizzle-orm/pg-core"

export const User = pgTable("user", {
    id: uuid("id").primaryKey().defaultRandom(),
    fullName: text("full_name").notNull(),
    email: text("email").notNull().unique(),
    hashedPassword: text("hashed_password"),
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

export const Notifications= pgTable("notifications", {
    notification_id: serial('notification_id').primaryKey(),

    userId: uuid("user_id")
        .notNull()
        .references(() => User.id),
    sentAt: timestamp("sent_at", {
        withTimezone: true,
        mode: "date",
    }).defaultNow().notNull(),
    messageId: integer('message_id')
    .references(()=> MessageTemplate.messageId),

    isRead: boolean("is_read").default(false),
})
export const NotifcationsRelations = relations(Notifications, ({ one }) => ({
    user: one(MessageTemplate, { references: [MessageTemplate.messageId], fields: [Notifications.messageId] }),
}))

export const MessageTemplate = pgTable("message_template", {
    messageId: serial("id").primaryKey(), 
    message: text("message").notNull(), 
    type: text("type").notNull(),
});

export type Session = typeof Session.$inferSelect

export const SessionRelations = relations(Session, ({ one }) => ({
    user: one(User, { references: [User.id], fields: [Session.userId] }),
}))

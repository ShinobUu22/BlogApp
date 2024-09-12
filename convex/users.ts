import { v } from "convex/values";
import { internalMutation, internalQuery, query } from "./_generated/server";



export const createUser = internalMutation({
    args: {
        username: v.string(),
        imageUrl: v.string(),
        clerkId: v.string(),
        email: v.string(),

    },
    handler: async (ctx, args) => {
        await ctx.db.insert("users", args)
    }
})

export const getUser = internalQuery({
    args: { clerkId: v.string() },
    handler: async (ctx, { clerkId }) => {
        return ctx.db
            .query("users")
            .filter(q => q.eq(q.field("clerkId"), clerkId))
            .first();
    },
});

export const getUsers = query({
    handler: async (ctx) => {
        return ctx.db.query("users").collect
    }
})
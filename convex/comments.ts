import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const createComment = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        comments: v.string(),
        userId: v.string(),
        postId: v.string(),
        userImg: v.string(),
    },
    handler: async (ctx, args) => {
        try {
            await ctx.db.insert("comments", {
                ...args,
                likes: 0,
                dislikes: 0
            });
            console.log("Posts Inserted successfully");
            return { ok: true };
        } catch (error) {
            return { ok: false, error: "Failed to insert" };
        }
    }
});



export const getComments = query({
    handler: async (ctx) => {
        return await ctx.db.query("comments").order("desc").take(10)
    }
})



export const likeComment = mutation({
    args: {
        commentId: v.id("comments"),
        increment: v.boolean()
    },
    handler: async (ctx, { commentId, increment }) => {
        const comment = await ctx.db.get(commentId);
        if (comment) {
            const newLikes = increment ? comment.likes + 1 : comment.likes - 1;
            await ctx.db.patch(commentId, { likes: newLikes });
        }
    }
});

export const dislikeComment = mutation({
    args: {
        commentId: v.id("comments"),
        increment: v.boolean()
    },
    handler: async (ctx, { commentId, increment }) => {
        const comment = await ctx.db.get(commentId);
        if (comment) {
            const newDislikes = increment ? comment.dislikes + 1 : comment.dislikes - 1;
            await ctx.db.patch(commentId, { dislikes: newDislikes });
        }
    }
});

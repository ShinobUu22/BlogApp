import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";



export const createPost = mutation({
    args: {
        title: v.string(),
        slug: v.string(),
        userId: v.string(),
        content: v.string(),
        imageUrl: v.string(),
        featuredPost: v.boolean(),
        categoryId: v.string(),
        excerpt: v.string(),
        views: v.number(),
    },
    handler: async (ctx, args) => {
        try {
            await ctx.db.insert("postMessage", args)
            console.log("Posts Inserted successfully");
            return { ok: true }
        } catch (error) {
            return { ok: false, error: "Failed to insert" }
        }
    }
})

export const getPost = query({
    handler: async (ctx) => {
        return await ctx.db.query("postMessage").order("desc").collect()
    }
})

export const getRecentPost = query({
    handler: async (ctx) => {
        return await ctx.db.query("postMessage").order("desc").collect()
    }
})


export const getSimilarPost = query({
    args: {
        post: v.string(),
    },
    handler: async (ctx, { post }) => {
        const posts = await ctx.db.query("postMessage").withIndex("by_slug", q => q.eq("slug", post)).take(5)
        return posts
    }
})

export const increaseViewCount = mutation({
    args: {
        postId: v.id("postMessage")
    },
    handler: async (ctx, { postId }) => {
        try {
            const post = await ctx.db.get(postId)

            if (!post) {
                throw new ConvexError("Post not found")
            }
            await ctx.db.patch(postId, { views: post.views + 1 })
            return { ok: true }
        } catch (error) {
            console.log("Failed to increase view count", error)
            return { ok: false, error: "Failed to increase view count" }
        }
    }
})


export const getPostByCategories = query({
    args: {
        categoryId: v.string()
    },
    handler: async (ctx, { categoryId }) => {
        const post = await ctx.db.query("postMessage").withIndex("by_categoryId", q => q.eq("categoryId", categoryId)).take(10)
        return post
    }
})

export const getSearchedPosts = query({
    args: {
        query: v.string(),
    },
    handler: async (ctx, { query }) => {
        const titleResponse = await ctx.db.query("postMessage").withSearchIndex("search_according_to_title", q => q.search("title", query)).collect();
        return titleResponse
    }
})
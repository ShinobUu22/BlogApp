import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
    users: defineTable({
        username: v.string(),
        imageUrl: v.string(),
        clerkId: v.string(),
        email: v.string(),
    })
        .index("by_email", ["email"])
        .index("by_clerkId", ["clerkId"])
        .index("by_username", ["username"]),

    comments: defineTable({
        name: v.string(),
        email: v.string(),
        comments: v.string(),
        userId: v.string(),
        postId: v.string(),
        userImg: v.string(),
        likes: v.number(),
        dislikes: v.number(),
    }),

    postMessage: defineTable({
        title: v.string(),
        slug: v.string(),
        content: v.string(),
        imageUrl: v.string(),
        featuredPost: v.boolean(),
        categoryId: v.string(),
        excerpt: v.string(),
        userId: v.string(),
        views: v.number(),
    })
        .index("by_slug", ["slug"])
        .index("by_categoryId", ["categoryId"])
        .searchIndex("search_according_to_title", {
            searchField: "title"
        })
}
)




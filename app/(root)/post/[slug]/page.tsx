"use client";

import Author from "@/components/shared/Author";
import Categories from "@/components/shared/Categories";
import Comments from "@/components/shared/Comments";
import CommentsForm from "@/components/shared/CommentsForm";
import PostDetail from "@/components/shared/postDetail";
import PostWidget from "@/components/shared/postWidget";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { BlogPost } from "@/components/interface/interfaces";
import { Id } from "@/convex/_generated/dataModel";

const PostPage = () => {
  const { slug } = useParams();
  const [viewIncremented, setViewIncremented] = useState<boolean>(false);

  const blog = useQuery(api.postMessage.getPost) as BlogPost[] | undefined;
  const incViewCount = useMutation(api.postMessage.increaseViewCount);
  const post = blog?.find((u) => u._id === slug);

  if (post && !viewIncremented) {
    const convexId: Id<"postMessage"> = post._id as Id<"postMessage">;
    incViewCount({ postId: convexId });
    setViewIncremented(true);
  }

  console.log("slug : " + slug);

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post} />
          <CommentsForm slug={slug} />
          <Comments slug={slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget slug={slug} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;

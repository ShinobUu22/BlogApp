"use client";

import React from "react";
import { BlogPost } from "../interface/interfaces";
import PostCard from "./PostCard";
import PostWidget from "./postWidget";
import Categories from "./Categories";

interface PostProps {
  postCat?: BlogPost[];
}

const Posts: React.FC<PostProps> = ({ postCat = [] }) => {
  const slug = postCat?.length > 0 ? postCat[0].slug : "";
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-8 col-span-1">
        {postCat?.map((post) => <PostCard key={post.title} post={post} />)}
      </div>
      <div className="lg:col-span-4 col-span-1">
        <div className="lg:sticky relative top-8">
          <PostWidget slug={slug} />

          <Categories />
        </div>
      </div>
    </div>
  );
};

export default Posts;

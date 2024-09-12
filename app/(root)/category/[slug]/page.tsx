"use client";

import Posts from "@/components/shared/posts";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { BlogPost } from "@/components/interface/interfaces";

const CatPage = () => {
  const { slug } = useParams();
  const category = slug.toString();
  const catId = useQuery(api.postMessage.getPostByCategories, {
    categoryId: category,
  }) as BlogPost[] | [];

  return (
    <div className="">
      <Posts postCat={catId} />
    </div>
  );
};

export default CatPage;

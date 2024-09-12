"use client";

import Posts from "@/components/shared/posts";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const CatPage = () => {
  const post = useQuery(api.postMessage.getPost);

  return (
    <div className="">
      <Posts postCat={post} />
    </div>
  );
};

export default CatPage;

"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { BlogPost } from "../interface/interfaces";
import Image from "next/image";
import Link from "next/link";

interface Props {
  slug: string | string[];
}

const PostWidget: React.FC<Props> = ({ slug }) => {
  const getRecPost = useQuery(api.postMessage.getRecentPost) as
    | BlogPost[]
    | undefined;
  const getSimilarPost = useQuery(api.postMessage.getSimilarPost, {
    post: slug.toString(),
  }) as BlogPost[] | undefined;
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (slug) {
      if (getSimilarPost) {
        setRelatedPosts(getSimilarPost);
      }
    } else {
      if (getRecPost) {
        setRelatedPosts(getRecPost);
      }
    }
  }, [slug, getRecPost, getSimilarPost]);

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 mb-8 pb-12">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Related Post" : "Recent Post"}
      </h3>
      {relatedPosts.map((post) => (
        <div className="flex items-center w-full mb-4" key={post.title}>
          <div className="w-16 flex-none">
            {post.imageUrl && (
              <Image
                src={post.imageUrl}
                alt=""
                height={60}
                width={60}
                className="align-middle rounded-full"
              />
            )}
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs ">
              {moment(post._creationTime).format("MMM DD, YYYY")}
            </p>
            <Link href={`/post/${post.slug}`} className="text-md">
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;

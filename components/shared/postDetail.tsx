import React from "react";
import { BlogPost, user } from "../interface/interfaces";
import Image from "next/image";
import { MdDateRange } from "react-icons/md";
import moment from "moment";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ToHtml from "@/utils/toHtml";

interface Props {
  post?: BlogPost;
}

const PostDetail: React.FC<Props> = ({ post }) => {
  const User = useQuery(api.users.getUser) as user[] | undefined;
  const author = User?.filter((u) => u._id === post?.userId);
  const image = author?.find((i) => i.imageUrl)?.imageUrl;
  if (!post) {
    return null;
  }

  return (
    <div className="bg-white shadow-lg rounded-xl lg:p-8 pb-12 mb-8">
      <div
        className="relative overflow-hidden shadow-md mb-6"
        style={{ paddingTop: "56.25%" }}
      >
        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            alt="Post Image"
            fill
            className="object-top h-full w-full rounded-t-xl object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full">
          <div className="flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
            {image && (
              <Image
                src={image}
                alt=""
                height={30}
                width={30}
                className="align-middle rounded-full"
              />
            )}
            <p className="inline align-middle text-gray-700 ml-2 text-lg ">
              {author?.find((i) => i.username)?.username}
            </p>
          </div>
          <div className="font-medium text-gray-700 flex justify-center">
            <MdDateRange size={25} className="" />
            <span>{moment(post._creationTime).format("MMM DD, YYYY")}</span>
          </div>
        </div>
        <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
        <ToHtml content={post.content} />
      </div>
    </div>
  );
};

export default PostDetail;

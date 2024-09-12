import React from "react";
import { BlogPost, user } from "../interface/interfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MdDateRange } from "react-icons/md";
import moment from "moment";
interface Props {
  post: BlogPost;
}

const CategoryTsx: React.FC<Props> = ({ post }) => {
  const router = useRouter();
  const User = useQuery(api.users.getUser) as user[] | undefined;
  const author = User?.filter((u) => u._id === post.userId);
  const image = author?.find((i) => i.imageUrl)?.imageUrl;

  function handleClick() {
    router.push(`/post/${post._id}`);
  }
  return (
    <div className="bg-white shadow-lg rounded-xl p-0 lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md pb-80 mb-6">
        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            alt="image"
            className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-xl"
            fill
          />
        )}
      </div>
      <h1 className="transition duration-300 text-center mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold">
        <span onClick={handleClick}>{post.title}</span>
      </h1>
      <span className="leading-normal float-right w-fit text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600 bg-clip-text text-transparent">
        {post.categoryId}
      </span>
      <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
        <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
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
      <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">
        {post.excerpt}
      </p>
      <div className="text-center">
        <span
          className="transition duration-500 transform hover:-translate-y-1 inline-block bg-gradient-to-r from-purple-500 to-blue-600 text-lg font-medium rounded-full text-white py-3 px-8 cursor-pointer"
          onClick={handleClick}
        >
          Continue Reading
        </span>
        <span className="float-right">Views: {post.views}</span>
      </div>
    </div>
  );
};

export default CategoryTsx;

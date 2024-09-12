import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";
import React from "react";
import { BlogPost, user } from "../interface/interfaces";

interface Props {
  author?: BlogPost;
}

const Author: React.FC<Props> = ({ author }) => {
  const user = useQuery(api.users.getUsers) as user[] | undefined;
  const authImg = user?.find((u) => u.username === author?.userId)?.imageUrl;
  const authName = user?.find((u) => u.username === author?.userId)?.username;

  return (
    <div className="text-center mt-20 mb-8 p-8 rounded-xl bg-black bg-opacity-20 flex justify-center gap-5">
      <h3 className="text-white my-4 text-xl font-bold">Author:</h3>
      <div className="relative w-12 h-12 flex mt-2">
        {authImg && (
          <Image alt="author" fill className="rounded-full" src={authImg} />
        )}
      </div>
      <h3 className="text-white my-4 text-xl font-bold">{authName}</h3>
    </div>
  );
};

export default Author;

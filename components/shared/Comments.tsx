import React, { useState } from "react";
import moment from "moment";
import parse from "html-react-parser";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Comment } from "../interface/interfaces";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { Id } from "@/convex/_generated/dataModel"; // Import the Id type

interface Props {
  slug: string | string[];
}

const Comments: React.FC<Props> = ({ slug }) => {
  const [userReactions, setUserReactions] = useState<
    Record<string, "liked" | "disliked" | "none">
  >({});
  const [colorLike, setColorLike] = useState<Record<string, string>>({});
  const [colorDislike, setColorDisLike] = useState<Record<string, string>>({});

  const getComments = useQuery(api.comments.getComments) as
    | Comment[]
    | undefined;

  const likeComment = useMutation(api.comments.likeComment);
  const dislikeComment = useMutation(api.comments.dislikeComment);

  const comments = getComments?.filter(
    (com) => com.postId === slug.toString()
  ) as Comment[] | undefined;

  function handleLikeButton(commentId: Id<"comments">) {
    const currentReaction = userReactions[commentId] || "none";
    const newColorLike = { ...colorLike };
    const newColorDislike = { ...colorDislike };

    if (currentReaction === "liked") {
      delete newColorLike[commentId];
      setUserReactions((prev) => ({ ...prev, [commentId]: "none" }));
      likeComment({ commentId, increment: false });
    } else {
      newColorLike[commentId] = "red";
      setUserReactions((prev) => ({ ...prev, [commentId]: "liked" }));
      likeComment({ commentId, increment: true });
      if (currentReaction === "disliked") {
        delete newColorDislike[commentId];
        setUserReactions((prev) => ({ ...prev, [commentId]: "none" }));
        dislikeComment({ commentId, increment: false });
      }
    }

    setColorLike(newColorLike);
    setColorDisLike(newColorDislike);
  }

  function handleDislikeButton(commentId: Id<"comments">) {
    const currentReaction = userReactions[commentId] || "none";
    const newColorDislike = { ...colorDislike };
    const newColorLike = { ...colorLike };

    if (currentReaction === "disliked") {
      delete newColorDislike[commentId];
      setUserReactions((prev) => ({ ...prev, [commentId]: "none" }));
      dislikeComment({ commentId, increment: false });
    } else {
      newColorDislike[commentId] = "gray";
      setUserReactions((prev) => ({ ...prev, [commentId]: "disliked" }));
      dislikeComment({ commentId, increment: true });
      if (currentReaction === "liked") {
        delete newColorLike[commentId];
        setUserReactions((prev) => ({ ...prev, [commentId]: "none" }));
        likeComment({ commentId, increment: false });
      }
    }

    setColorLike(newColorLike);
    setColorDisLike(newColorDislike);
  }

  return (
    <div>
      {getComments && (
        <div className="bg-white shadow-lg rounded-xl p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {comments?.length} Comments
          </h3>
          {comments &&
            comments.map((com) => (
              <div
                className="border-b border-gray-100 mb-4 pb-4"
                key={com._creationTime}
              >
                <p className="mb-2 flex items-center">
                  {com.userImg && (
                    <Image
                      alt={com._id.toString()} // Make sure this is a valid string for alt text
                      src={com.userImg}
                      height={30}
                      width={30}
                      className="rounded-full mx-2"
                    />
                  )}
                  <span className="font-semibold mr-1"> {com.name} </span> on{" "}
                  {moment(com._creationTime).format("MMM DD, YYYY")}
                </p>
                <p className="whitespace-pre-line text-gray-600 w-full flex gap-2 items-center">
                  <FaArrowRight size={20} /> {parse(com.comments)}
                </p>
                <div className="flex gap-4 mt-3 float-right">
                  <div className="">
                    <AiOutlineLike
                      size={24}
                      color={colorLike[com._id as string] || ""}
                      onClick={() =>
                        handleLikeButton(com._id as Id<"comments">)
                      }
                      className="cursor-pointer"
                    />
                    <span className="flex justify-center">{com.likes}</span>
                  </div>
                  <div className="">
                    <AiOutlineDislike
                      size={24}
                      color={colorDislike[com._id as string] || ""}
                      onClick={() =>
                        handleDislikeButton(com._id as Id<"comments">)
                      }
                      className="cursor-pointer"
                    />
                    <span className="flex justify-center">{com.dislikes}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Comments;

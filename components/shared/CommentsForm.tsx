import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Link from "next/link";

interface Props {
  slug: string | string[];
}

const CommentsForm: React.FC<Props> = ({ slug }) => {
  const [error, setError] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const commentEl = useRef<HTMLTextAreaElement>(null);

  const { user } = useUser();
  const userId = user?.id ?? "";
  const userName = user?.fullName || "";
  const userEmail = user?.emailAddresses[0]?.emailAddress || "";
  const userImgUrl = user?.imageUrl || "";

  const postComment = useMutation(api.comments.createComment);

  async function handleCommentSubmission() {
    setError(false);

    if (!commentEl.current?.value) {
      setError(true);
      return;
    }

    try {
      const commentData = {
        name: userName,
        email: userEmail,
        comments: commentEl.current.value,
        userId: userId,
        userImg: userImgUrl,
        postId: Array.isArray(slug) ? slug.join("-") : slug,
      };

      console.log("Sending comment data:", commentData);

      const res = await postComment(commentData);

      console.log("Response from postComment:", res);

      // Check if res is truthy (exists)
      if (res) {
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
        console.log("Successfully posted");
      } else {
        throw new Error("Failed to post comment");
      }
    } catch (error) {
      console.error(
        "Error posting:",
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 pb-12 mb-8">
      <SignedIn>
        <h3 className="text-xl mb-8 font-semibold border-b pb-4">
          Leave a comment
        </h3>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <span>Leave a Reply as {userName}?</span>
          <textarea
            name="comment"
            className="p-4 outline-none w-full rounded-xl focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
            placeholder="Comment"
            ref={commentEl}
          />
        </div>

        {error && <p className="text-xs text-red-500">Comment is required.</p>}
        <div className="mt-8">
          <Button
            onClick={handleCommentSubmission}
            className="transition duration-500 ease hover:bg-indigo-900 flex bg-pink-600 text-lg rounded-full text-white px-8 py-3 items-center"
          >
            Post Comment
          </Button>
          {showSuccessMessage && (
            <span className="text-xl float-right font-semibold mt-3 text-green-500">
              Comment Submitted Successfully!
            </span>
          )}
        </div>
      </SignedIn>
      <SignedOut>
        <div className="flex justify-between">
          <span>Login to leave a comment!</span>
          <Link
            href={`/sign-in`}
            className="bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 px-4 py-2 rounded-2xl text-gray-200 cursor-pointer hover:scale-105 duration-300"
          >
            Click Here to Login
          </Link>
        </div>
      </SignedOut>
    </div>
  );
};

export default CommentsForm;

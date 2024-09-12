"use client";

import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.bubble.css";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { uploadImage } from "@/utils/uploadImage";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const WritePage = () => {
  const [desc, setDesc] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [slug, setSlug] = useState<string>("");
  const [cat, setCat] = useState<string>("");

  const excerpt = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const user = useUser();

  const removeImagePreview = () => {
    setImage(null);
  };

  const createPosts = useMutation(api.postMessage.createPost);

  const success = () => alert("Published successfully");
  const error = (message: string) => alert(message);

  const getAuthor = user.user?.fullName?.toString();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      error("Image is required");
      return;
    }
    if (!getAuthor) {
      error("Error occurred");
      return;
    }

    try {
      const uploadedImageUrl = await uploadImage(image);
      const generatedSlug = cat.trim().toLowerCase().replace(/ /g, "-");
      setSlug(generatedSlug);

      if (title.length < 2) {
        error("Title must be at least 5 characters long.");
        return;
      }
      if (!cat) {
        error("Select a Category.");
        return;
      }
      if (desc.length < 20) {
        error("Description must be at least 20 characters long.");
        return;
      }

      const response = await createPosts({
        title,
        categoryId: cat,
        content: desc,
        slug: generatedSlug,
        views: 0,
        imageUrl: uploadedImageUrl,
        excerpt: excerpt.current?.value ? excerpt.current.value : "",
        userId: getAuthor,
        featuredPost: true,
      });

      if (response && response.ok) {
        success();
        router.push("/");
      } else {
        const errorMsg = response?.error || "Unknown error occurred";
        console.error("Error saving post:", errorMsg);
        error("Failed to save the post. Please try again.");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      error("Unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center px-4 py-6 lg:px-12 lg:py-12 bg-white rounded-2xl">
      <form onSubmit={handleSubmit} className="max-w-3xl place-self-center">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl text-center p-4 lg:p-6 font-semibold text-2xl lg:text-4xl bg-inherit border border-gray-300"
        />
        <div className="h-fit flex flex-col gap-6 lg:gap-8 mt-8">
          <div className="flex flex-col gap-4 lg:gap-8">
            <label
              htmlFor="upload-button"
              className="flex items-center gap-2 text-xl lg:text-2xl font-semibold cursor-pointer hover:scale-105 hover:text-indigo-500 duration-300"
            >
              <FaUpload size={24} />
              Upload your Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImage(e.target.files ? e.target.files[0] : null)
              }
              className="hidden"
              id="upload-button"
            />
          </div>
          <div className="flex flex-col gap-4 lg:gap-8">
            <div className="flex items-center gap-4 lg:gap-8">
              <span className="text-xl lg:text-2xl font-semibold">
                Category Title:
              </span>
              <select
                onChange={(e) => setCat(e.target.value)}
                defaultValue="dis"
                className="h-12 w-full max-w-[200px] text-lg text-center border border-gray-300 rounded-lg"
              >
                <option value="dis" disabled>
                  Select Category
                </option>
                <option value="lifestyle">Lifestyle</option>
                <option value="technology">Technology</option>
                <option value="travel">Travel</option>
                <option value="business">Business</option>
                <option value="economy">Economy</option>
                <option value="sports">Sports</option>
              </select>
            </div>
            <div className="flex items-center gap-4 lg:gap-8">
              <span className="text-xl lg:text-2xl font-semibold">Author:</span>
              <span className="text-lg lg:text-xl flex items-center">
                {user.user?.fullName}
              </span>
            </div>
            <div className="flex flex-col gap-4 lg:gap-8">
              <span className="text-xl lg:text-2xl font-semibold">
                Excerpt:
              </span>
              <textarea
                name="comment"
                className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                placeholder="Comment"
                ref={excerpt}
              />
            </div>
            <div className="flex flex-col gap-4 lg:gap-8">
              <span className="text-xl lg:text-2xl font-semibold">
                Description:
              </span>
              <ReactQuill
                theme="bubble"
                value={desc}
                onChange={setDesc}
                className="quill p-4 border-[2px] h-48 w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 "
              />
            </div>
          </div>
          <Button className="bg-green-400 my-10" type="submit">
            Publish
          </Button>
        </div>
      </form>
      {image && (
        <div className="w-full mt-8 flex flex-col items-center">
          <div className="relative w-full max-w-3xl">
            <div className="relative pb-[56.25%] w-full">
              <Image
                src={URL.createObjectURL(image)}
                alt="Image Preview"
                className="absolute top-0 left-0 w-full h-full object-cover"
                layout="fill"
              />
            </div>
          </div>
          <Button
            className="bg-red-500 text-white hover:bg-red-600 mt-4"
            onClick={removeImagePreview}
          >
            Remove Image
          </Button>
        </div>
      )}
    </div>
  );
};

export default WritePage;

"use client";
import React, { useState, useEffect } from "react";
import { BlogPost } from "../interface/interfaces";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "../ui/button";
import PostCard from "./PostCard";

const Search = () => {
  const [searchItem, setSearchItem] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);

  const searchedItem = useQuery(
    api.postMessage.getSearchedPosts,
    active && searchItem.trim() !== "" ? { query: searchItem } : "skip"
  ) as BlogPost[] | [];

  useEffect(() => {
    if (searchItem.trim() === "") {
      setActive(false);
    }
  }, [searchItem]);

  function handleSearch() {
    if (searchItem.trim() !== "") {
      setActive(true);
    } else {
      setActive(false);
    }
  }

  return (
    <main className="">
      <div className="bg-white shadow-lg rounded-xl lg:p-8 pb-12 mb-8 flex items-center justify-center gap-2">
        <input
          type="search"
          value={searchItem}
          className="border-2 bg-slate-200 rounded-xl text-lg px-4 py-2"
          onChange={(e) => setSearchItem(e.target.value)}
        />
        <Button className="bg-green-400 rounded-xl" onClick={handleSearch}>
          Search
        </Button>
      </div>

      {active ? (
        <div className="bg-white shadow-lg rounded-xl lg:p-8 pb-12 mb-8">
          {searchedItem?.length > 0 ? (
            searchedItem.map((post) => <PostCard key={post._id} post={post} />)
          ) : (
            <h2 className="text-center text-3xl text-gray-600">
              No results found
            </h2>
          )}
        </div>
      ) : (
        <h2 className="text-center text-3xl text-white">Search for a blog!</h2>
      )}
    </main>
  );
};

export default Search;

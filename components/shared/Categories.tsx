"use client";

import React from "react";
import { categories } from "@/constants/constants";
import Link from "next/link";

const Categories = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8 mb-8 pb-12">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
      {categories.map((cat) => (
        <Link key={cat.slug} href={`/category/${cat.slug}`}>
          <span className="cursor-pointer w-fit block pb-3 mb-3 hover:scale-105 duration-500 hover:text-indigo-500">
            {cat.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;

"use client";

import About from "@/components/shared/About";
import Form from "@/components/shared/form";
import Search from "@/components/shared/search";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const BlogPage = () => {
  const { slug } = useParams();
  const [sl, setSl] = useState<string | string[]>("");

  useEffect(() => {
    if (slug) {
      setSl(slug);
    }
  }, [slug]);
  if (sl === "about") return <About />;
  if (sl === "write") return <Form />;
  if (sl === "search") return <Search />;
};

export default BlogPage;

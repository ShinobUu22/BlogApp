import Layout from "@/constants/Layout";
import React from "react";

const rootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Layout>{children}</Layout>
    </div>
  );
};

export default rootLayout;

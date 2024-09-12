import React from "react";

interface ToHtmlProps {
  content: string;
}

const ToHtml: React.FC<ToHtmlProps> = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default ToHtml;

import React from "react";

const BlockRichText = ({ data }) => {
  return (
    <div className="max-w-4xl">
      <div
        className="rich-text-content"
        dangerouslySetInnerHTML={{
          __html: data.richTextBody?.data?.childMarkdownRemark?.html,
        }}
      />
    </div>
  );
};

export default BlockRichText;

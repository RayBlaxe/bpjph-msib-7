import React from "react";

const BlockQuote = ({ data }) => {
  return (
    <div className="py-6">
      <blockquote className="max-w-xl py-2 pl-6 text-neutral-700">
        <p className="text-justify text-xl font-medium italic">
          {data.quoteBody}
        </p>
        <cite className="mt-4 block font-bold uppercase not-italic">
          {data.title}
        </cite>
      </blockquote>
    </div>
  );
};

export default BlockQuote;

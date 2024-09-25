import React from "react";
import Video from "./video";

const BlockYoutube = ({ data }) => {
  const url = data.url;

  return (
    <div className="max-w-4xl py-8">
      <Video src={url} title={"Youtube"} className="w-full sm:h-40 md:h-96" />
    </div>
  );
};

export default BlockYoutube;

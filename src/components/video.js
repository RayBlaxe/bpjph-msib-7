import React from "react";
const Video = ({ src, title, ...props }) => (
  <iframe
    className="w-full"
    src={src}
    title={title}
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    webkitallowfullscreen="true"
    mozallowfullscreen="true"
    allowFullScreen
    {...props}
  />
);
export default Video;

import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useState } from "react";
import ImgsViewer from "react-images-viewer";
import { normalizeUrl } from "../utils";

const Headings = ({
  title,
  caption,
  authorName,
  publishedAt,
  date,
  image,
  imageAlt,
}) => {
  const [imageState, setImageState] = useState({
    image: [{ src: "" }],
    open: false,
  });

  const previewImage = () => {
    if (image?.url) {
      const url = normalizeUrl(image.url);
      setImageState({ image: [{ src: url }], open: true });
    }
  };

  const onClose = () => setImageState({ ...imageState, open: false });

  return (
    <header className="mt-8">
      <h1 className="text-xl font-bold text-neutral-700">{title}</h1>
      <p className="text-xs">{date || publishedAt}</p>
      <div className="cursor-pointer" onClick={previewImage}>
        <GatsbyImage
          image={getImage(image)}
          alt={imageAlt || title}
          className="pointer mt-6"
        />
      </div>
      <span className="text-xs italic">{caption}</span>
      <ImgsViewer
        imgs={imageState.image}
        currImg={0}
        isOpen={imageState.open}
        onClickPrev={console.log}
        onClickNext={console.log}
        onClose={onClose}
        backdropCloseable={true}
        theme={{
          footerCount: {
            display: "none",
          },
        }}
      />
    </header>
  );
};

export default Headings;

import React, { useState } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ImgsViewer from "react-images-viewer";
import { normalizeUrl } from "../utils";

const BlockGrid = ({ data }) => {
  const [imageState, setImageState] = useState({
    image: [{ src: "" }],
    open: false,
  });

  console.log(process.env)

  const previewImage = (url) => {
    if (url) {
      setImageState({
        image: [{ src: normalizeUrl(url) }],
        open: true,
      });
    }
  };

  const onClose = () => setImageState({ ...imageState, open: false });

  if (!data || !Array.isArray(data.images)) return null;

  return (
    <div className="grid max-w-4xl gap-6 py-4 lg:grid-cols-3">
      {data.images.map((image, index) => {
        return (
          <div
            key={`grid-media-${index}`}
            className="cursor-pointer"
            onClick={() => previewImage(image?.localFile?.url)}
          >
            <GatsbyImage
              className="rounded-md"
              image={getImage(image?.localFile)}
              alt={image?.alternativeText || "halal.go.id"}
            />
          </div>
        );
      })}
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
    </div>
  );
};

export default BlockGrid;

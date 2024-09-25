import React, { useState } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ImgsViewer from "react-images-viewer";
import Video from "./video";
import { normalizeUrl } from "../utils";

const BlockMedia = ({ data }) => {
  const mime = data?.file?.mime;
  const [imageState, setImageState] = useState({
    image: [{ src: "" }],
    open: false,
  });

  const previewImage = () => {
    if (data?.file?.localFile?.url) {
      const url = normalizeUrl(data?.file?.localFile?.url);
      setImageState({
        image: [{ src: url }],
        open: true,
      });
    }
  };

  const onClose = () => setImageState({ ...imageState, open: false });

  if (!mime || !data || !data?.file) return null;
  // const isPdf = mime === "application/pdf";
  const isVideo = mime.startsWith("video");
  const isImage = String(mime).includes("image");

  if (!isImage) {
    return (
      <FileDownload
        title={data?.file?.name}
        url={normalizeUrl(data?.file?.localFile?.url)}
      />
    );
  }

  return (
    <div className="max-w-4xl py-4">
      {isVideo ? (
        <Video
          src={data?.file?.localFile?.url}
          title={data?.file?.alternativeText}
        />
      ) : (
        <div className="cursor-pointer" onClick={previewImage}>
          <GatsbyImage
            image={getImage(data.file?.localFile)}
            alt={data?.file?.alternativeText || "halal.go.id"}
          />
        </div>
      )}
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

const FileDownload = ({ url, title = "Download" }) => {
  return (
    <a
      href={url}
      target="_blank"
      className={`flex w-full flex-wrap rounded-md px-5 py-2.5 text-left text-sm font-semibold font-medium text-purple hover:opacity-80 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto`}
      rel="noreferrer"
    >
      {title}
    </a>
  );
};

export default BlockMedia;

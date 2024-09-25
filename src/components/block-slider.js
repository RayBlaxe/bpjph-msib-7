import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BlockSlider = ({ data }) => {
  if (!data || !data?.files || !Array.isArray(data?.files)) return null;

  return (
    <div className="max-w-4xl pt-8">
      <Slider
        dots={false}
        infinite={true}
        speed={300}
        slidesToShow={1}
        slidesToScroll={1}
        arrows={true}
        swipe={true}
      >
        {data.files.map((file) => (
          <GatsbyImage
            key={file.id}
            image={getImage(file?.localFile)}
            alt={file?.alternativeText || "halal.go.id"}
          />
        ))}
      </Slider>
    </div>
  );
};

export default BlockSlider;

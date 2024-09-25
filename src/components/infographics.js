import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

const Infographics = ({ data, previewImage }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className={"mt-4 w-full"}>
      <h1 className="text-md mb-3 border-b-2 border-green font-semibold text-fontPrimary">
        <FormattedMessage id="infographic" defaultMessage={"Infografis"} />
      </h1>
      <div className="relative isolate overflow-hidden rounded-md bg-white shadow-md">
        <Slider
          dots={false}
          infinite={true}
          slidesToShow={1}
          slidesToScroll={1}
          arrows={true}
          swipe={true}
          speed={500}
          autoplay={true}
        >
          {data.map((item) => (
            <div
              key={item?.image.id}
              onClick={() => previewImage(item.image?.localFile)}
            >
              <GatsbyImage
                className=""
                image={getImage(item?.image?.localFile)}
                alt={item?.image?.alternativeText || "halal.go.id"}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Infographics;

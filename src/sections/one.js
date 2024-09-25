import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import Slider from "react-slick";
import SearchFormLarge from "../components/form-large";
import ServiceOptions from "../components/service-options";
import useService from "../hooks/service";

const SectionOne = (props) => {
  const { banner } = props?.data;
  const locale = props?.pageContext?.locale || "id";
  const {
    data: dataService,
    error: errorService,
    isFetching: loadingService,
  } = useService(locale);

  // 1200x250

  return (
    <>
      <div className="container overflow-hidden">
        <Slider
          dots={false}
          infinite={true}
          speed={500}
          arrows={false}
          swipe={true}
          autoplay={true}
          className="my-2 overflow-hidden rounded-md"
        >
          {banner.nodes.map(({ image }, index) => (
            <GatsbyImage
              key={index}
              image={getImage(image.localFile)}
              alt={image?.alternativeText || "halal.go.id"}
            />
          ))}
        </Slider>
      </div>
      {loadingService || errorService ? null : (
        <div className="container mb-0 md:mb-5">
          <ServiceOptions data={dataService} />
        </div>
      )}
      <SearchFormLarge type={"sertifikat"} {...props} />
    </>
  );
};

export default SectionOne;

import React from "react";
import { graphql } from "gatsby";
import BlockRichText from "./block-rich-text";
import BlockMedia from "./block-media";
import BlockQuote from "./block-quote";
import BlockSlider from "./block-slider";
import BlockGrid from "./block-grid";
import BlockYoutube from "./block-youtube";

const componentsMap = {
  STRAPI__COMPONENT_SHARED_RICH_TEXT: BlockRichText,
  STRAPI__COMPONENT_SHARED_MEDIA: BlockMedia,
  STRAPI__COMPONENT_SHARED_QUOTE: BlockQuote,
  STRAPI__COMPONENT_SHARED_SLIDER: BlockSlider,
  STRAPI__COMPONENT_SHARED_GRID_MEDIA: BlockGrid,
  STRAPI__COMPONENT_SHARED_YOUTUBE: BlockYoutube,
};

const Block = ({ block }) => {
  const Component = componentsMap[block.__typename];

  if (!Component) {
    return null;
  }

  return <Component data={block} />;
};

const BlocksRenderer = ({ blocks }) => {
  return (
    <div>
      {blocks.map((block, index) => (
        <Block key={`${index}${block.__typename}`} block={block} />
      ))}
    </div>
  );
};

export const query = graphql`
  fragment Blocks on STRAPI__COMPONENT_SHARED_GRID_MEDIASTRAPI__COMPONENT_SHARED_MEDIASTRAPI__COMPONENT_SHARED_QUOTESTRAPI__COMPONENT_SHARED_RICH_TEXTSTRAPI__COMPONENT_SHARED_SLIDERSTRAPI__COMPONENT_SHARED_YOUTUBEUnion {
    __typename
    ... on STRAPI__COMPONENT_SHARED_RICH_TEXT {
      richTextBody: body {
        __typename
        data {
          id
          childMarkdownRemark {
            html
          }
        }
      }
    }
    ... on STRAPI__COMPONENT_SHARED_MEDIA {
      file {
        mime
        alternativeText
        name
        localFile {
          absolutePath
          childImageSharp {
            gatsbyImageData
          }
          url
        }
      }
    }
    ... on STRAPI__COMPONENT_SHARED_QUOTE {
      title
      quoteBody: body
    }
    ... on STRAPI__COMPONENT_SHARED_SLIDER {
      files {
        id
        mime
        alternativeText
        localFile {
          childImageSharp {
            gatsbyImageData
          }
          url
        }
      }
    }
    ... on STRAPI__COMPONENT_SHARED_GRID_MEDIA {
      images {
        id
        mime
        alternativeText
        localFile {
          childImageSharp {
            gatsbyImageData
          }
          url
        }
      }
    }
    ... on STRAPI__COMPONENT_SHARED_YOUTUBE {
      url
    }
  }
`;

export default BlocksRenderer;

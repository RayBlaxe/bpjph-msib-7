// import React from "react";
// import { graphql } from "gatsby";
// import Layout from "../components/layout";
// import BlocksRenderer from "../components/blocks-renderer";
// import Seo from "../components/seo";
// import Headings from "../components/headings";

// const ArticlePage = ({ data, ...props }) => {
//   console.log(props);

//   const { title, blocks } = data.strapiProfile;

//   const seo = {
//     metaTitle: title,
//     metaDescription: title,
//   };

//   return (
//     <Layout>
//       <Seo seo={seo} />
//       <Headings title={title} />
//       <BlocksRenderer blocks={blocks} />
//     </Layout>
//   );
// };

// export const pageQuery = graphql`
//   query ($locale: String) {
//     strapiProfile(locale: { eq: $locale }) {
//       title
//       blocks {
//         ...Blocks
//       }
//     }
//   }
// `;

// export default ArticlePage;

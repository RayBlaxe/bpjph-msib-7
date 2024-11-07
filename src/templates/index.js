import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import SectionOne from "../sections/one";
import LandingPageContent from "../components/landing-page-content";
import SideCard from "../components/side-card";

const IndexPage = (props) => {
  const { strapiGlobal, allStrapiArticle, allStrapiInfographic } = props.data;
  return (
    <Layout {...props} {...props?.pageContext}>
      <Seo seo={{ metaTitle: strapiGlobal.siteName }} />
      <main>
        <SectionOne {...props} />
        <div className="container grid grid-cols-1 gap-0 md:grid-cols-3 md:gap-6">
          <div className="col-span-2">
            <LandingPageContent {...props} />
          </div>
          <div className="col-span-1">
            <SideCard
              articles={allStrapiArticle?.nodes}
              locale={props?.pageContext?.locale}
              infographics={allStrapiInfographic?.nodes}
            />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export const query = graphql`
  query ($locale: String) {
    strapiGlobal {
      siteName
      siteDescription
    }
    banner: allStrapiBanner(filter: { locale: { eq: $locale } }) {
      nodes {
        image {
          alternativeText
          localFile {
            childImageSharp {
              gatsbyImageData(aspectRatio: 4.8)
            }
            url
          }
        }
        locale
      }
    }
    allStrapiCategory(
      sort: { fields: order }
      filter: { locale: { eq: $locale }, showInHomePage: { eq: true } }
    ) {
      nodes {
        name
        slug
        locale
        section
      }
    }
    allStrapiArticle(
      limit: 7
      sort: { fields: date, order: DESC }
      filter: { locale: { eq: $locale }, date: { ne: null } }
    ) {
      nodes {
        title
        date(formatString: "DD MMMM YYYY - HH.mm", locale: $locale)
        publishedAt(formatString: "DD MMMM YYYY - HH.mm", locale: $locale)
        description
        locale
        slug
        category {
          slug
        }
      }
    }
    contents: allStrapiArticle(
      filter: {
        category: { showInHomePage: { eq: true } }
        locale: { eq: $locale }
        date: { ne: null }
      }
      sort: { fields: date, order: DESC }
    ) {
      group(field: category___slug, limit: 7) {
        articles: nodes {
          title
          date(formatString: "DD MMMM YYYY - HH.mm", locale: $locale)
          publishedAt(formatString: "DD MMMM YYYY - HH.mm", locale: $locale)
          description
          locale
          slug
          cover {
            alternativeText
            localFile {
              childImageSharp {
                gatsbyImageData(aspectRatio: 1.77)
              }
              url
            }
          }
          category {
            slug
            name
            section
          }
        }
      }
    }
    allStrapiInfographic(filter: { locale: { eq: $locale } }) {
      nodes {
        image {
          id
          alternativeText
          localFile {
            url
            childImageSharp {
              gatsbyImageData(aspectRatio: 1)
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;

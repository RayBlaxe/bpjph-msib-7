import React, { useMemo } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import BlocksRenderer from "../components/blocks-renderer";
import SideCard from "../components/side-card";
import Headings from "../components/headings";
import ShareButtons from "../components/share-buttons";

const ArticlePage = (props) => {
  const {
    allStrapiArticle,
    allStrapiInfographic,
    strapiArticle: article,
  } = props?.data;

  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.cover,
  };

  const publishedAt = useMemo(() => {
    if (!article) return "";
    return article.date;
  }, [article]);

  const authorName = useMemo(() => {
    if (!article?.author || !article?.author?.name) return "Admin";
    return article?.author?.name;
  }, [article]);

  const isGallery = useMemo(() => {
    return article?.template === "gallery";
  }, [article?.template]);

  return (
    <Layout as="article" {...props} {...props?.pageContext}>
      <Seo seo={seo} />
      <div className="container grid grid-cols-1 gap-0 md:grid-cols-3 md:gap-10">
        <div className="col-span-2">
          {!isGallery ? (
            <Headings
              title={article.title}
              authorName={authorName}
              publishedAt={publishedAt}
              image={article?.cover?.localFile}
              imageAlt={article?.cover?.alternativeText}
              caption={article?.cover?.caption}
            />
          ) : null}
          <main className="mb-3 border-b-2">
            <BlocksRenderer blocks={article.blocks || []} />
          </main>
          <ShareButtons
            title={article.title}
            url={`${process.env.SITE_URL}${props.uri}`}
          />
        </div>
        <div className="col-span-1">
          <SideCard
            showSearch
            articles={allStrapiArticle?.nodes}
            locale={props?.pageContext?.locale}
            infographics={allStrapiInfographic?.nodes}
          />
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query ($slug: String, $locale: String) {
    strapiArticle(slug: { eq: $slug }) {
      id
      slug
      title
      description
      date(formatString: "DD MMMM YYYY - HH.mm", locale: $locale)
      publishedAt(formatString: "DD MMMM YYYY - HH.mm", locale: $locale)
      template
      author {
        name
      }
      cover {
        alternativeText
        caption
        localFile {
          url
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      blocks {
        __typename
        ...Blocks
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

export default ArticlePage;

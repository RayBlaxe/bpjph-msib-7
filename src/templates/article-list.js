import React from "react";
import { graphql, navigate } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import SideCard from "../components/side-card";
import ArticleCardHorizontal from "../components/article-card-horizontal";
import PrevButton from "../components/prev-button";
import NextButton from "../components/next-button";

const ArticleList = (props) => {
  const { data, pageContext } = props;
  const { allStrapiArticle, recentArticles, allStrapiInfographic } = data;
  const { currentPage, slug, numPages } = pageContext;

  const onNext = () => navigate(`/${slug}/${currentPage + 1}`);
  const onPrev = () => navigate(`/${slug}/${currentPage - 1}`);

  return (
    <Layout {...props} {...props?.pageContext}>
      <Seo seo={{ metaTitle: pageContext.title }} />
      <main>
        <div className="container grid grid-cols-1 gap-0 md:grid-cols-3 md:gap-10">
          <div className="col-span-2">
            <h1 className="my-7 text-center text-lg font-semibold md:text-xl">
              {pageContext?.title}
            </h1>
            {allStrapiArticle?.nodes.map((article, index) => {
              return (
                <ArticleCardHorizontal
                  containerClass="my-7"
                  key={index}
                  locale={props?.pageContext?.locale}
                  article={article}
                  {...props}
                />
              );
            })}
            <div className="my-5 flex flex-row justify-between">
              {currentPage > 1 ? <PrevButton onClick={onPrev} /> : <div />}
              {currentPage > 0 && currentPage < numPages ? (
                <NextButton onClick={onNext} />
              ) : (
                <div />
              )}
            </div>
          </div>
          <div className="col-span-1">
            <SideCard
              showSearch
              articles={recentArticles?.nodes}
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
  query ($slug: String, $locale: String, $skip: Int, $limit: Int) {
    allStrapiArticle(
      filter: { category: { slug: { eq: $slug } }, date: { ne: null } }
      sort: { fields: date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        slug
        title
        description
        date(formatString: "DD MMMM YYYY - HH.mm", locale: $locale)
        publishedAt(formatString: "DD MMMM YYYY - HH.mm", locale: $locale)
        category {
          slug
        }
        cover {
          alternativeText
          localFile {
            childImageSharp {
              gatsbyImageData(aspectRatio: 1.77)
            }
            url
          }
        }
      }
    }
    recentArticles: allStrapiArticle(
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
            url
          }
        }
      }
    }
  }
`;

export default ArticleList;

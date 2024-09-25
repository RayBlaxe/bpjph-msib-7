import React, { useMemo } from "react";
import ArticleCardHorizontal from "./article-card-horizontal";
import { Link, graphql, useStaticQuery } from "gatsby";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { FormattedMessage } from "react-intl";

const ArticlesList = ({ title, slug, noThumbnail, ...props }) => {
  const data = useStaticQuery(graphql`
    query {
      allStrapiArticle(sort: { fields: date, order: DESC }) {
        nodes {
          title
          publishedAt
          date
          description
          locale
          slug
          category {
            slug
          }
          id
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
    }
  `);

  const articles = useMemo(() => {
    const locale = props?.locale || "id";
    if (
      !data ||
      !data?.allStrapiArticle ||
      !Array.isArray(data.allStrapiArticle.nodes)
    ) {
      return [];
    }
    return data.allStrapiArticle.nodes
      .filter(
        (item) => item?.locale === locale && item?.category?.slug === slug
      )
      .slice(0, 7);
  }, [data, props?.locale, slug]);

  if (!articles || articles.length === 0) return <div />;
  const url = `${props.locale === "id" ? "" : `/${props.locale}`}/${slug}`;

  if (noThumbnail) {
    return (
      <div className="mb-5 w-full">
        <h1 className="text-md mb-3 border-b-2 border-green font-semibold text-fontPrimary">
          {title}
        </h1>
        <div className="overflow-hidden rounded-md shadow-md">
          <div className="bg-white px-5 pt-5">
            {articles.slice(0, 5).map((article, index) => (
              <Item key={index} data={article} {...props} />
            ))}
          </div>
          <div className="bg-fontSecondary px-3 py-2">
            <div className="flex items-center justify-end">
              <Link to={url} className="text-xs text-white">
                <FormattedMessage
                  id="view_more"
                  defaultMessage={"Lihat Semua"}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="sm:my-2 md:my-0">
      <Link to={url}>
        <h1 className="mb-3 border-b-2 border-green text-base font-semibold text-fontPrimary hover:opacity-80">
          {title}
        </h1>
      </Link>
      {articles.slice(0, 5).map((article, index) => (
        <ArticleCardHorizontal key={index} article={article} {...props} />
      ))}
      {articles.length > 5 ? (
        <Link to={url}>
          <span className="float-right mt-3 flex flex-row items-center text-sm hover:text-green">
            <FormattedMessage id="more" defaultMessage={"Selengkapnya"} />
            <HiOutlineArrowSmRight className="ml-1 text-lg" />
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
};

const Item = ({ data, basePath }) => {
  const link = `detail/${data.slug}`;
  return (
    <Link to={link} className="flex flex-col">
      <div className="col-span-1 mr-2 truncate pb-2 text-sm font-semibold text-fontPrimary line-clamp-2">
        {data.title}
      </div>
      <div className="text-start text-xs text-fontPrimary sm:text-justify md:col-span-3">
        {data.description}
      </div>
      <hr className="mt-1 mb-3 md:col-span-4" />
    </Link>
  );
};

export default ArticlesList;

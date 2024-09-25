import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useMemo } from "react";
import ArticleCardHorizontal from "./article-card-horizontal";
import { FormattedMessage } from "react-intl";
import { HiOutlineArrowSmRight } from "react-icons/hi";

const CardGallery = ({ locale, article, isHeadline, showPublishedDate }) => {
  const base = locale === "id" ? "" : `/${locale}`;
  const path = `${base}/detail/${article?.slug}`;
  const publishedAt = useMemo(() => {
    if (!article) return "";
    let date = article.date || article.publishedAt;
    return date;
  }, [article]);
  return (
    <Link to={path}>
      <div
        className="relative isolate overflow-hidden rounded-md bg-cover bg-no-repeat shadow-lg"
        style={{ backgroundPosition: "50%" }}
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
      >
        {article?.cover?.localFile && (
          <GatsbyImage
            className="w-full"
            image={getImage(article?.cover?.localFile)}
            alt={article?.cover?.alternativeText || "image"}
          />
        )}
        <div
          className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        >
          <div className="flex h-full items-end justify-start">
            <div className="m-3 text-white">
              {isHeadline ? (
                <p className="text-ellipsis text-lg">{article.title}</p>
              ) : (
                <p className="text-ellipsis text-xs line-clamp-2">
                  {article.title}
                </p>
              )}
              {showPublishedDate && <p className="text-xs">{publishedAt}</p>}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const Headline = ({ data, locale }) => {
  const headline = data[0];
  return (
    <>
      <CardGallery
        isHeadline
        showPublishedDate
        article={headline}
        locale={locale}
        key={`headline-card-first`}
      />
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {data.slice(1, 4).map((article, index) => {
          return (
            <CardGallery
              article={article}
              locale={locale}
              showPublishedDate
              key={`headline-card-${index + 1}`}
            />
          );
        })}
      </div>
    </>
  );
};

const Gallery = ({ data, locale }) => {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {data.slice(0, 6).map((article, index) => {
        return (
          <CardGallery
            article={article}
            locale={locale}
            key={`card-gallery-item-${index}`}
          />
        );
      })}
    </div>
  );
};

const CardText = ({ data, locale }) => {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {data.slice(0, 6).map((article, index) => {
        const newArticle = article;
        delete newArticle.cover;
        return (
          <ArticleCardHorizontal
            containerClass={`bg-white rounded-md p-3 my-0`}
            key={`card-text-${index}`}
            article={newArticle}
            locale={locale}
          />
        );
      })}
    </div>
  );
};

const GridContent = ({ data, locale = "id", type }) => {
  if (!data || !Array.isArray(data)) return null;
  const { name: title, slug: categorySlug } = data[0].category;
  const url = `${locale === "id" ? "" : `/${locale}`}/${categorySlug}`;
  return (
    <>
      <div className="mb-3 flex flex-row items-center justify-between">
        <h1 className="text-base font-semibold text-fontPrimary hover:opacity-80">
          {title}
        </h1>
        <Link to={url}>
          <span className="float-right flex flex-row items-center text-sm hover:text-green">
            <FormattedMessage id="more" defaultMessage={"Selengkapnya"} />
            <HiOutlineArrowSmRight className="ml-1 text-lg" />
          </span>
        </Link>
      </div>
      {type === "headline" && <Headline data={data} locale={locale} />}
      {type === "gallery" && <Gallery data={data} locale={locale} />}
      {type === "card-text" && <CardText data={data} locale={locale} />}
    </>
  );
};

const LandingPageContent = (props) => {
  const data = props?.data?.contents.group;
  if (!data || !Array.isArray(data)) {
    return <div />;
  }
  const newData = data.sort((a, b) => {
    const x = a.articles[0].category.section;
    const y = b.articles[0].category.section;
    return x - y;
  });
  return (
    <div>
      {newData.map(({ articles }, index) => {
        let type = "card-text";
        if (index === 0) type = "headline";
        if (index === 1) type = "card-text";
        if (index === 2) type = "gallery";
        return (
          <div key={`article-container-${index}`} className="py-2 md:py-5">
            <GridContent
              type={type}
              data={articles}
              locale={props?.pageContext?.locale}
            />
          </div>
        );
      })}
    </div>
  );
};

export default LandingPageContent;

/**
http://cmsbl.halal.go.id/api/articles?publicationState=live&locale=id&filters[category][slug][$eq]=profil

*/

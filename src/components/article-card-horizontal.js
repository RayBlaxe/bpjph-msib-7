import React, { useMemo } from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const ArticleCardHorizontal = ({ article, containerClass, ...props }) => {
  const locale = props?.locale || "id";
  const base = locale === "id" ? "" : `/${locale}`;
  const path = `${base}/detail/${article?.slug}`;

  const publishedAt = useMemo(() => {
    if (!article) return "";
    return article.date || article.publishedAt;
  }, [article]);

  return (
    <Link to={path}>
      <div
        className={`flex w-full max-w-md overflow-hidden bg-transparent ${containerClass}`}
      >
        {article?.cover?.localFile && (
          <GatsbyImage
            className="relative isolate mr-4 h-24 w-32 flex-none rounded-md bg-cover text-center"
            image={getImage(article?.cover?.localFile)}
            alt={article?.cover?.alternativeText || "image"}
          />
        )}
        <div
          className={`${
            article?.cover?.localFile ? "h-24" : "h-auto"
          } flex flex-1 flex-col justify-between overflow-hidden bg-transparent leading-normal lg:w-auto`}
        >
          <div className="mb-1 truncate whitespace-pre-wrap text-sm font-semibold text-fontPrimary line-clamp-3">
            {article.title}
          </div>
          <p className="min-w-full overflow-hidden text-ellipsis text-xs text-fontPrimary">
            {publishedAt}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCardHorizontal;

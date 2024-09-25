import React, { useMemo } from "react";
import ArticlesList from "../components/articles-list";

const SectionTwo = (props) => {
  const data = props?.data?.allStrapiCategory.nodes;
  const filteredData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return data.filter((item) => item.section === 2);
  }, [data]);

  return (
    <div className="grid gap-0 py-2 sm:grid-cols-1 md:grid-cols-2 md:gap-4 md:py-5">
      {filteredData.slice(0, 2).map((category, index) => {
        return (
          <ArticlesList
            key={index}
            title={category.name}
            articles={category.articles || []}
            categorySlug={category?.slug}
            {...category}
          />
        );
      })}
    </div>
  );
};

export default SectionTwo;

/**
http://cmsbl.halal.go.id/api/articles?publicationState=live&locale=id&filters[category][slug][$eq]=profil

*/

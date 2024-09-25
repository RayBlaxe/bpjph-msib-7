import React, { useMemo } from "react";
import ArticlesList from "../components/articles-list";

const SectionFour = (props) => {
  const data = props?.data?.allStrapiCategory.nodes;
  const filteredData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return data.filter((item) => item.section === 3);
  }, [data]);

  return (
    <div className="grid gap-0 py-2 sm:grid-cols-1 md:grid-cols-2 md:gap-4 md:py-5">
      {filteredData.slice(2).map((category, index) => {
        return (
          <ArticlesList
            key={index}
            title={category.name}
            articles={category.articles || []}
            {...props}
            {...category}
          />
        );
      })}
    </div>
  );
};

export default SectionFour;

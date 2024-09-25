const path = require("path");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  // Define a template
  const index = path.resolve("./src/templates/index.js");
  const articleList = path.resolve("./src/templates/article-list.js");
  const article = path.resolve("./src/templates/article.js");

  const site = await graphql(
    `
      {
        site {
          siteMetadata {
            defaultLocale
            locales
          }
        }
      }
    `
  );

  if (site.errors) {
    reporter.panicOnBuild(`There was an error loading your Site`, site.errors);
    return;
  }

  const { defaultLocale, locales } = site.data.site.siteMetadata;

  const {
    data: {
      allStrapiCategory: { nodes: listOfCategory },
      allStrapiArticle: { nodes: listOfArticle },
    },
  } = await graphql(`
    query getData {
      allStrapiCategory {
        nodes {
          locale
          name
          slug
          localizations {
            data {
              attributes {
                locale
                slug
              }
            }
          }
          articles {
            id
          }
        }
      }
      allStrapiArticle {
        nodes {
          title
          description
          slug
          locale
          localizations {
            data {
              attributes {
                slug
                locale
              }
            }
          }
        }
      }
    }
  `);
  try {
    //  ARTICLE PAGE
    listOfArticle.forEach((data) => {
      const {
        title: titleArticle,
        slug: slugArticle,
        locale: localeArticle,
        localizations: localizationsArticle,
      } = data;

      const pathOfArticle =
        localeArticle === defaultLocale
          ? `/detail/${slugArticle}`
          : `/${localeArticle}/detail/${slugArticle}`;

      let localeLinksArticle = localizationsArticle?.data.map(
        (localizationArticle) => {
          const { slug, locale } = localizationArticle?.attributes;
          const language = locale === defaultLocale ? "" : `/${locale}`;
          return {
            locale,
            url: `${language}/detail/${slug}`,
          };
        }
      );

      createPage({
        path: pathOfArticle,
        component: article,
        context: {
          title: titleArticle,
          slug: slugArticle,
          defaultLocale: defaultLocale,
          locale: localeArticle,
          locales: localeLinksArticle,
        },
      });
    });
  } catch (error) {
    if (error) {
      reporter.panicOnBuild(
        `There was an error loading your Strapi articles`,
        error
      );
      return;
    }
  }

  try {
    // ARTICLE LIST BY CATEGORY PAGE
    listOfCategory.forEach((category) => {
      const {
        name: nameCategory,
        slug: slugCategory,
        locale: localeCategory,
        localizations: localizationsCategory,
        articles,
      } = category;

      const pathOfCategory =
        localeCategory === defaultLocale
          ? `/${slugCategory}`
          : `/${localeCategory}/${slugCategory}`;

      let localeLinksCategory = localizationsCategory?.data.map(
        (localizationCategory) => {
          const { slug, locale } = localizationCategory?.attributes;
          return {
            locale,
            url: locale === defaultLocale ? "" : `/${locale}/${slug}`,
          };
        }
      );
      const articlePerPage = 10;
      const numPages = Math.ceil(articles.length / articlePerPage);
      Array.from({ length: numPages }).forEach((_, index) => {
        createPage({
          path: index === 0 ? pathOfCategory : `${pathOfCategory}/${index + 1}`,
          component: articleList,
          context: {
            numPages,
            limit: articlePerPage,
            skip: index * articlePerPage,
            currentPage: index + 1,
            title: nameCategory,
            slug: slugCategory,
            defaultLocale: defaultLocale,
            locale: localeCategory,
            locales: localeLinksCategory,
          },
        });
      });
    });
  } catch (error) {
    if (error) {
      reporter.panicOnBuild(
        `There was an error loading your Strapi category`,
        error
      );
      return;
    }
  }
  locales.forEach(async (locale) => {
    // INDEX PAGE
    const localeLinks = locales
      .filter((item) => item !== locale)
      .map((item) => {
        return {
          locale: item,
          url: item === defaultLocale ? "/" : `/${item}`,
        };
      });
    createPage({
      path: locale === defaultLocale ? "/" : `/${locale}`,
      component: index,
      context: {
        defaultLocale: defaultLocale,
        locale,
        locales: localeLinks,
      },
    });
  });
};

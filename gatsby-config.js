require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const pluginOptions = {
  i18n: {
    locale: "all", // Fetch all localizations
  },
};

module.exports = {
  siteMetadata: {
    locales: ["en", "id"],
    defaultLocale: "id",
    siteURL: process.env.SITE_URL || "http://localhost:8000",
  },
  plugins: [
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-source-strapi",
      options: {
        // apiURL: process.env.STRAPI_API_URL || "http://localhost:1337",
        apiURL: "https://cmsbl.halal.go.id",
        accessToken: process.env.STRAPI_TOKEN,
        enableListener: true,
        collectionTypes: [
          {
            singularName: "banner",
            queryParams: {
              populate: "*",
            },
          },
          {
            singularName: "infographic",
            queryParams: {
              publicationState: "live",
              populate: "*",
            },
          },
          // {
          //   singularName: "service",
          //   queryParams: {
          //     publicationState: "live",
          //     populate: "*",
          //   },
          //   pluginOptions: pluginOptions,
          // },
          {
            singularName: "article",
            queryParams: {
              publicationState: "live",
              populate: {
                id: "*",
                slug: "*",
                title: "*",
                description: "*",
                cover: "*",
                date: "*",
                category: {
                  slug: "*",
                  locale: "*",
                },
                blocks: {
                  populate: "*",
                },
                showInMenu: "*",
                localizations: {
                  populate: "*",
                },
                // author: {
                //   populate: "*",
                // },
              },
            },
            queryLimit: 50,
            pluginOptions: pluginOptions,
          },
          {
            singularName: "category",
            pluginOptions: pluginOptions,
          },
        ],
        singleTypes: [
          {
            singularName: "contact",
            queryParams: {
              populate: "*",
            },
          },
          {
            singularName: "address",
            queryParams: {
              populate: "*",
            },
          },
          {
            singularName: "global",
            queryParams: {
              populate: {
                favicon: "*",
                defaultSeo: {
                  populate: "*",
                },
              },
            },
          },
        ],
        timeout: 20000,
      },
    },
    {
      resolve: "gatsby-plugin-i18n",
      options: {
        langKeyForNull: "id",
        langKeyDefault: "id",
        useLangKeyLayout: true,
        prefixDefault: false,
      },
    },
    {
      resolve: "gatsby-plugin-schema-snapshot",
      options: {
        update: false,
      },
    },
    // {
    //   resolve: "gatsby-plugin-create-client-paths",
    //   options: {
    //     prefixes: ["/search/*"],
    //   },
    // },
    {
      resolve: "gatsby-plugin-zopfli",
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-transformer-remark",
  ],
};

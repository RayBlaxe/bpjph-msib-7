import { useQuery } from "react-query";
import { request, gql } from "graphql-request";

const useMenu = (locale = "id") => {
  return useQuery("menus", async () => {
    const {
      categories: { data },
    } = await request(
      process.env.STRAPI_GRAPHQL,
      gql`
        query ($locale: I18NLocaleCode) {
          categories(
            locale: $locale
            filters: { showInMenu: { eq: true } }
            sort: "order"
          ) {
            data {
              attributes {
                name
                url
                slug
                articles(filters: { showInMenu: { eq: true } }) {
                  data {
                    attributes {
                      title
                      url
                      slug
                      locale
                    }
                  }
                }
              }
            }
          }
        }
      `,
      {
        locale,
      }
    );
    if (data && data.length > 0) {
      return data.map(({ attributes }) => attributes);
    }
    return data;
  });
};

export default useMenu;

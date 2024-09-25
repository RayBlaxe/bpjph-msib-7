import { useQuery } from "react-query";
import { request, gql } from "graphql-request";

const useService = (locale = "id") => {
  return useQuery("services", async () => {
    const {
      services: { data },
    } = await request(
      process.env.STRAPI_GRAPHQL,
      gql`
        query ($locale: I18NLocaleCode) {
          services(locale: $locale, filters: { active: { eq: true } }) {
            data {
              attributes {
                judul
                url
                icon {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                locale
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

export default useService;

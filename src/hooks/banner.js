import { useQuery } from "react-query";
import { request, gql } from "graphql-request";

const useBanner = (locale = "id") => {
  return useQuery("banners", async () => {
    const {
      banners: { data },
    } = await request(
      process.env.STRAPI_GRAPHQL,
      gql`
        query {
          banners {
            data {
              attributes {
                image {
                  data {
                    attributes {
                      name
                      caption
                      alternativeText
                      url
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
      return data.map(({ attributes }) => {
        const {
          image: {
            data: { attributes: newAttributes },
          },
        } = attributes;
        return {
          ...newAttributes,
          url: `${process.env.STRAPI_PUBLIC_URL}${newAttributes.url}`,
        };
      });
    }
    return data;
  });
};

export default useBanner;

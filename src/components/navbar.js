import React, { useMemo } from "react";
import MenuButton from "./menu-button";
import logo from "../assets/BPJPH_logo.png";
import Dropdown from "./dropdown";
import LanguageSwitcher from "./language-switcher";
import { graphql, navigate, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

const Navbar = ({ locales, pageContext, ...props }) => {
  const { defaultLocale = "id" } = props;
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  const locale = pageContext?.locale || "id";
  // const { data, error, isFetching } = useMenu(locale);

  // if (isFetching || error) {
  //   return null;
  // }

  const menu = useStaticQuery(graphql`
    query {
      data: allStrapiCategory(
        sort: { order: ASC, fields: order }
        filter: { showInMenu: { eq: true } }
      ) {
        nodes {
          slug
          showInMenu
          name
          locale
          url
          articles {
            title
            url
            slug
            locale
            showInMenu
          }
        }
      }
    }
  `);

  const values = useMemo(() => {
    if (menu.data.nodes && menu.data.nodes.length > 0) {
      return menu.data.nodes.filter((item) => item.locale === locale);
    }
    return [];
  }, [locale, menu.data.nodes]);

  return (
    <div className="sticky top-0 z-50 w-full bg-purple text-white">
      <div className="mx-auto flex max-w-screen-xl flex-col md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between p-4">
          <a className="flex flex-row" href="/">
            <StaticImage
              src="../assets/logo_halal.PNG"
              height={52}
              layout="fixed"
              placeholder="blurred"
              alt="Logo BPJPH"
              className="pl-2"
            />
          </a>
          <div className="flex flex-row items-center">
            <LanguageSwitcher
              className={"md:hidden"}
              currentLocale={locale}
              locales={locales}
            />
            <MenuButton
              onClick={() => setNavbarOpen(!navbarOpen)}
              isOpen={navbarOpen}
            />
          </div>
        </div>

        <nav
          className={`flex-grow flex-col pb-4 sm:px-4 md:flex md:flex-row md:justify-end md:px-0 md:pb-0 ${navbarOpen ? "flex" : "hidden"
            }`}
        >
          {values.map((item, index) => {
            const hasArticle =
              item?.articles.filter((a) => a.showInMenu).length > 0;
            item.url ||= `${locale === defaultLocale ? "" : `/${locale}`}/${item.slug
              }`;

            if (hasArticle) {
              return (
                <Dropdown
                  key={index}
                  title={item.name}
                  data={item.articles}
                  locale={item.locale}
                />
              );
            }
            return (
              <div
                key={index}
                onClick={() => navigate(item.url)}
                className="focus:shadow-outline text-md mt-2 cursor-pointer rounded-lg bg-transparent px-2 py-2 font-semibold hover:bg-white hover:text-purple focus:bg-white focus:text-purple focus:outline-none md:mt-0 md:ml-2"
                rel="noreferrer"
              >
                {item.name}
              </div>
            );
          })}

          <div
            key={'e-library'}
            onClick={() => navigate('elibrary')}
            className="focus:shadow-outline text-md mt-2 cursor-pointer rounded-lg bg-transparent px-2 py-2 font-semibold hover:bg-white hover:text-purple focus:bg-white focus:text-purple focus:outline-none md:mt-0 md:ml-2"
            rel="noreferrer"
          >
            e-library
          </div>
        </nav>
        <LanguageSwitcher
          className={"ml-2 hidden md:block"}
          currentLocale={locale}
          locales={locales}
        />
      </div>
    </div>
  );
};

export default Navbar;

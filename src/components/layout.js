import React, { useMemo } from "react";
import { IntlProvider } from "react-intl";
import { QueryClient, QueryClientProvider, QueryCache } from "react-query";
import Footer from "./footer";
import Navbar from "./navbar";
import en from "../locales/en.json";
import id from "../locales/id.json";

const queryCache = new QueryCache();
const queryClient = new QueryClient({ queryCache });

const Layout = ({ children, ...props }) => {
  const {
    pageContext: { locale, defaultLocale },
  } = props;

  const messages = useMemo(() => {
    const language = { en, id };
    return language[locale];
  }, [locale]);

  return (
    <IntlProvider
      messages={messages}
      locale={locale}
      defaultLocale={defaultLocale}
    >
      <QueryClientProvider client={queryClient}>
        <div className="flex min-h-screen flex-col justify-between bg-neutral-50 text-neutral-900">
          <div>
            <Navbar {...props} />
            {children}
          </div>
          <Footer {...props} />
        </div>
      </QueryClientProvider>
    </IntlProvider>
  );
};

export default Layout;

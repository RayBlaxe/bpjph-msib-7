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
  // Ensure pageContext exists, otherwise fallback to default values
  const { pageContext } = props;
  const locale = pageContext?.locale || 'en'; // Default to 'en' if locale is not available
  const defaultLocale = pageContext?.defaultLocale || 'en'; // Default to 'en' if defaultLocale is not available

  // Determine the correct messages based on the locale
  const messages = useMemo(() => {
    const language = { en, id };
    return language[locale] || language['en']; // Fallback to English if locale is not found
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

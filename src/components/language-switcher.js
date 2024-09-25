import React, { useState } from "react";
import { FlagId, FlagEn } from "./flags";
import { navigate } from "gatsby";

const LanguageSwitcher = ({
  className,
  currentLocale = "id",
  locales = [{ locale: "id", url: "/" }, { locale: "en", url: "/" }],
}) => {
  const [open, setOpen] = useState(false);
  const title = {
    id: "IDN",
    en: "ENG",
  };
  const flag = {
    id: <FlagId className="mr-2 w-6 rounded" />,
    en: <FlagEn className="mr-2 w-6 rounded" />,
  };

  return (
    <div className={`relative z-40 mr-3 ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="focus:shadow-outline text-md flex w-full flex-row items-center justify-center rounded-lg bg-transparent text-left text-center font-semibold focus:outline-none md:p-2"
      >
        {flag[currentLocale]}
        <span className="text-xs md:text-base">{title[currentLocale]}</span>
        <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          className={`ml-1 inline h-4 w-4 transform transition-transform duration-200 rotate-${open ? 180 : 0
            }`}
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <div
        className={`absolute right-0 w-auto origin-top-right overflow-hidden rounded-md bg-white shadow-lg ${open ? "block" : "hidden"
          }`}
      >

        {locales.map((item, index) => {
          return (
            <div
              onClick={() => navigate(item.url)}
              key={index}
              className="focus:shadow-outline flex cursor-pointer flex-row bg-transparent px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-200 focus:text-gray-900 focus:outline-none md:mt-0"
            >
              {flag[item.locale]}
              <span className="text-xs">{title[item.locale]}</span>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default LanguageSwitcher;

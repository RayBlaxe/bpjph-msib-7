import React from "react";

const Dropdown = ({ data, title }) => {
  return (
    <div className="group relative">
      <button className="focus:shadow-outline text-md mt-2 flex w-full flex-row items-center rounded-t-lg bg-transparent px-2 py-2 text-left font-semibold hover:bg-white hover:text-purple focus:bg-white group-hover:bg-white group-hover:text-purple md:mt-0 md:ml-2 md:inline md:w-auto">
        <span>{title}</span>
        <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          className={`mt-1 ml-1 inline h-4 w-4 rotate-0 transform transition-transform duration-200 group-hover:rotate-180 md:-mt-1`}
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <div
        className={`absolute right-0 z-50 hidden w-full origin-top-right overflow-hidden rounded-lg rounded-t-none bg-white shadow-lg group-hover:block md:w-60 md:rounded-tr-none md:rounded-tl-lg`}
      >
        {data.map((article, index) => {
          const url =
            article.url ||
            `${article.locale === "id" ? "" : "/en"}/detail/${article.slug}`;
          return (
            <a
              key={index}
              className="focus:shadow-outline mt-2 block bg-transparent px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none md:mt-0"
              role="menuitem"
              href={url}
            >
              {article.title}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;

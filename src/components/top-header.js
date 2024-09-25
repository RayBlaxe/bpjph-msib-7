import React from "react";
import LanguageSwitcher from "./language-switcher";

function TopHeader(props) {
  return (
    <div className="bg-purple">
      <div className="container py-2 md:px-3">
        <div className="flex items-center justify-end">
          <div className="text-white">
            <LanguageSwitcher {...props} />
          </div>
          <a
            href="http://ptsp.halal.go.id/"
            target="_blank"
            className={`font-sm ml-5 rounded-md bg-green bg-purple py-1 px-5 py-2.5 text-center text-sm font-semibold font-medium text-white hover:bg-green hover:opacity-80 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto`}
            rel="noreferrer"
          >
            LOGIN
          </a>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;

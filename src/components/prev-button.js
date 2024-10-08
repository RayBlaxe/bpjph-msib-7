import React from "react";
import { FormattedMessage } from "react-intl";

const PrevButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center rounded bg-purple px-4 py-2 text-sm font-medium text-white"
    >
      <svg
        aria-hidden="true"
        className="mr-2 h-5 w-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
      <FormattedMessage id="prev" defaultMessage={"Sebelumnya"} />
    </button>
  );
};

export default PrevButton;

import React from "react";
import { FormattedMessage } from "react-intl";

const NextButton = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} inline-flex items-center rounded border-0 border-l border-white bg-purple px-4 py-2  text-sm font-medium text-white`}
    >
      <FormattedMessage id="next" defaultMessage={"Selanjutnya"} />
      <svg
        aria-hidden="true"
        className="ml-2 h-5 w-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
};

export default NextButton;

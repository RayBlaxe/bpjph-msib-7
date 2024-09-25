import React from "react";
import { FaFacebookSquare, FaTwitter } from "react-icons/fa";
import { HiLink } from "react-icons/hi";
import { RiWhatsappFill } from "react-icons/ri";
import { FormattedMessage } from "react-intl";

const ShareButton = ({ url, title }) => {
  const facebook = `https://facebook.com/sharer.php?u=${url}`;
  const twitter = `https://twitter.com/intent/tweet?text=${title} ${url}`;
  const whatsapp = `https://wa.me/?text=${title} ${url}`;

  const copyToClipboard = () => {
    const text = `${title} ${url}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="mb-5">
      <h1 className="md:text-md mb-2 text-sm font-semibold">
        <FormattedMessage id="share" defaultMessage={"Bagikan"} />
      </h1>
      <ul className="mb-6 flex flex-wrap items-center text-sm sm:mb-0">
        <li>
          <a href={facebook} target={"_blank"} rel="noreferrer">
            <FaFacebookSquare
              color="#4267B2"
              className="mr-4 h-5 w-5 p-0 text-white md:h-7 md:w-7"
            />
          </a>
        </li>
        <li>
          <a href={twitter} target={"_blank"} rel="noreferrer">
            <FaTwitter
              color="#00acee"
              className="mr-4 h-5 w-5 p-0 text-white md:h-7 md:w-7"
            />
          </a>
        </li>
        <li>
          <a href={whatsapp} target={"_blank"} rel="noreferrer">
            <RiWhatsappFill
              color="#25d366"
              className="mr-4 h-5 w-5 p-0 text-white md:h-7 md:w-7"
            />
          </a>
        </li>
        <li>
          <div className="cursor-pointer" onClick={copyToClipboard}>
            <HiLink
              color="#333"
              className="mr-4 h-5 w-5 p-0 text-white md:h-7 md:w-7"
            />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ShareButton;

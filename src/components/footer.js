import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import {
  FaInstagram,
  FaFacebookSquare,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FormattedMessage } from "react-intl";
import { StaticImage } from "gatsby-plugin-image";

const Footer = (props) => {
  const { strapiContact, strapiAddress } = useStaticQuery(graphql`
    query {
      strapiContact {
        twitter
        phone
        whatsapp
        email
        facebook
        instagram
        youtube
      }
      strapiAddress {
        address
      }
    }
  `);

  return (
    <footer className="bg-purple text-xs text-white">
      <div className="container my-10 grid gap-10 sm:grid-cols-1 md:grid-cols-7">
        <div className="col-span-1 flex flex-col justify-between md:col-span-3">
          <StaticImage
            alt="logo bpjph"
            src={"../assets/BPJPH_logo.png"}
            placeholder="blurred"
            height={64}
            layout="fixed"
          />
          <div className="mt-4 mb-8 flex flex-row">
            <StaticImage
              alt="logo halal"
              src={"../assets/logo_secondary_white.png"}
              placeholder="blurred"
              height={48}
              layout="fixed"
            />
            <StaticImage
              alt="logo pusaka"
              src={"../assets/pusaka.png"}
              placeholder="blurred"
              height={48}
              layout="fixed"
              className="ml-2"
            />
            <StaticImage
              alt="logo halal"
              src={"../assets/blu.png"}
              placeholder="blurred"
              height={48}
              layout="fixed"
              className="ml-2"
            />
            <StaticImage
              alt="logo halal"
              src={"../assets/asean.png"}
              placeholder="blurred"
              height={48}
              layout="fixed"
              className="ml-2"
            />
          </div>
          <p className="mt-1">{strapiAddress.address}</p>
        </div>
        <div className="col-span-1 md:col-span-2">
          <h1 className="my-2 text-base">
            <FormattedMessage id="contact_us" defaultMessage={"Kontak Kami"} />
          </h1>
          <FormattedMessage
            id="phone_value"
            defaultMessage={`Telp: ${strapiContact.phone}`}
            values={{ phone: strapiContact.phone }}
          />
          <p className="">Whatsapp: {strapiContact.whatsapp}</p>
          <p className="">Email: {strapiContact.email}</p>
        </div>
        <div className="col-span-1 md:col-span-2">
          <h1 className="my-2 text-base">
            <FormattedMessage id="follow_us" defaultMessage={"Ikuti Kami"} />
          </h1>
          <ul className="mb-6 flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 sm:mb-0">
            <li>
              <a
                href={strapiContact.facebook}
                target={"_blank"}
                rel="noreferrer"
              >
                <FaFacebookSquare className="mr-2 h-5 w-5 p-0 text-white md:h-7 md:w-7" />
              </a>
            </li>
            <li>
              <a
                href={strapiContact.twitter}
                target={"_blank"}
                rel="noreferrer"
              >
                <FaTwitter className="mr-2 h-5 w-5 p-0 text-white md:h-7 md:w-7" />
              </a>
            </li>
            <li>
              <a
                href={strapiContact.instagram}
                target={"_blank"}
                rel="noreferrer"
              >
                <FaInstagram className="mr-2 h-5 w-5 p-0 text-white md:h-7 md:w-7" />
              </a>
            </li>
            <li>
              <a
                href={strapiContact.youtube}
                target={"_blank"}
                rel="noreferrer"
              >
                <FaYoutube className="mr-2 h-5 w-5 p-0 text-white md:h-7 md:w-7" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-darkPurple py-5">
        <span className="block sm:text-center">
          © Copyright 2022 Badan Penyelenggara Jaminan Produk Halal.
        </span>
      </div>

      <a
        href={`https://wa.me/+6281180103146`}
        target={"_blank"}
        className="fixed bottom-10 right-10"
        rel="noreferrer"
      >
        <StaticImage
          src={"../assets/whatsapp.png"}
          alt="whatsapp"
          width={48}
          layout="fixed"
          placeholder="blurred"
          className="fixed bottom-12 right-7"
        />
      </a>
    </footer>
  );
};

export default Footer;

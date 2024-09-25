import React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

const links = [
  {
    icon: "/frontend/src/images/heartlogo.png",
    text: "Pendaftaran Sertifikat Halal",
    href: "https://ptsp.halal.go.id",
  },
  {
    icon: "/path-to-icon2.svg",
    text: "Lapor",
    href: "https://lapor.go.id",
  },
  {
    icon: "/path-to-icon3.svg",
    text: "Klaim Halal",
    href: "/https://wave.halal.go.id",
  },
  {
    icon: "/path-to-icon4.svg",
    text: "Traceability Halal",
    href: "https://trace.halal.go.id",
  },
  {
    icon: "/path-to-icon5.svg",
    text: "Traceability Halal",
    href: "/traceability-halal",
  },
];

const AdditionalSection = () => {
  return (
    <section className="my-10 p-6 text-center">
      <div className="container grid grid-flow-row-dense gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {links.map((link, index) => (
          <Link
            to={link.href}
            key={index}
            className="block rounded-lg border bg-white p-3 shadow-md transition hover:shadow-lg"
          >
            <StaticImage
              src={"/frontend/src/images/heartlogo.png"}
              alt={link.text}
              className="mx-auto mb-4 h-16"
            />
            <p className="text-sm font-semibold text-gray-700">{link.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AdditionalSection;

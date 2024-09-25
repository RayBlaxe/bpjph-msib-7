import React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

const links = [
  {
    icon: "../images/heartlogo.png",
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
      <div className="container grid grid-flow-row-dense gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <Link
          to="/link21"
          className="block rounded-lg border bg-white p-3 shadow-md transition hover:shadow-lg"
        >
          <StaticImage
            src={"../images/heartlogo.png"}
            alt="Pendaftaran Sertifikasi Halal"
            className="mx-auto mb-4 h-24 w-16"
          />
          <p className="text-md font-semibold text-gray-700">
            Pendaftaran Sertifikasi Halal
          </p>
        </Link>

        <Link
          to="/link2"
          className="block rounded-lg border bg-white p-3 shadow-md transition hover:shadow-lg"
        >
          <StaticImage
            src={"../images/laporlogo.png"}
            alt="Lapor"
            className="mx-auto mt-4 mb-4 h-20 w-full"
          />
          <p className="text-md font-bold text-gray-700">Lapor</p>
        </Link>

        <Link
          to="/link3"
          className="block rounded-lg border bg-white p-3 shadow-md transition hover:shadow-lg"
        >
          <StaticImage
            src={"halallogo.png"}
            alt="Kuliner Halal"
            className="mx-auto mb-4 h-24 w-24"
          />
          <p className="text-md font-bold text-gray-700">Kuliner Halal</p>
        </Link>

        <Link
          to="/link4"
          className="block rounded-lg border bg-white p-3 shadow-md transition hover:shadow-lg"
        >
          <StaticImage
            src={"../images/searchlogo.png"}
            alt="Traceability Halal"
            className="mx-auto mb-4 h-24 w-24"
          />
          <p className="text-md font-bold text-gray-700">Traceability Halal</p>
        </Link>

        <Link
          to="/link5"
          className="block rounded-lg border bg-white p-3 shadow-md transition hover:shadow-lg"
        >
          <StaticImage
            src={"../images/searchlogo.png"}
            alt="Traceability Halal"
            className="mx-auto mb-4 h-24 w-14"
          />
          <p className="text-md font-bold  text-gray-700">Traceability Halal</p>
        </Link>
      </div>
    </section>
  );
};

export default AdditionalSection;

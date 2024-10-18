import React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

const AdditionalSection = () => {
  return (
    <section className="my-2 mb-8 p-6 text-center">
      <div className="container grid grid-flow-row-dense gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <Link
          to="https://ptsp.halal.go.id"
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
          to="https://lapor.go.id"
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
          to="https://wave.halal.go.id"
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
          to="https://trace.halal.go.id"
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
          to="https://ringwas.halal.go.id"
          className="block rounded-lg border bg-white p-3 shadow-md transition hover:shadow-lg"
        >
          <StaticImage
            src={"../images/pengawasan.png"}
            alt="Jejaring Pengawas"
            className="mx-auto mb-4 h-24 w-14"
          />
          <p className="text-md font-bold  text-gray-700">Jejaring Pengawas</p>
        </Link>
      </div>
    </section>
  );
};

export default AdditionalSection;

import React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

const AdditionalSection = () => {
  return (
    <section className="my-2 mb-8 text-center">
      <h2 className="mt-5 mb-3 text-left font-bold text-gray-800">
        Informasi dan Layanan
      </h2>
      <div className="grid grid-flow-row-dense gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        <Link
          to="https://ptsp.halal.go.id"
          className="flex items-center rounded-lg border bg-white p-3 shadow-md hover:shadow-lg"
        >
          <StaticImage
            src={"../images/heartlogo.png"}
            alt="Pendaftaran Sertifikasi Halal"
            className="mr-4 h-12 w-16"
          />
          <p className="text-left text-sm font-semibold text-gray-700">
            Pendaftaran Sertifikasi Halal
          </p>
        </Link>

        <Link
          to="https://lapor.go.id"
          className="flex items-center rounded-lg border bg-white p-3 shadow-md hover:shadow-lg"
        >
          <StaticImage
            src={"../images/laporlogo.png"}
            alt="Lapor"
            className="mr-4 h-8 w-16"
          />
          <p className="text-left text-sm font-bold text-gray-700">Lapor</p>
        </Link>

        <Link
          to="https://wave.halal.go.id"
          className="flex items-center rounded-lg border bg-white p-3 shadow-md hover:shadow-lg"
        >
          <StaticImage
            src={"../images/halallogo.png"}
            alt="Kuliner Halal"
            className="mr-3 h-16 w-16"
          />
          <p className="text-left text-sm font-bold text-gray-700">
            Kuliner Halal
          </p>
        </Link>

        <Link
          to="https://trace.halal.go.id"
          className="flex items-center rounded-lg border bg-white p-3 shadow-md hover:shadow-lg"
        >
          <StaticImage
            src={"../images/traceability.png"}
            alt="Traceability Halal"
            className="mr-4 h-10 w-16"
          />
          <p className="text-left text-sm font-bold text-gray-700">
            Traceability Halal
          </p>
        </Link>

        <Link
          to="https://ringwas.halal.go.id"
          className="flex items-center rounded-lg border bg-white p-3 shadow-md  hover:shadow-lg"
        >
          <StaticImage
            src={"../images/pengawasan.png"}
            alt="Pengaduan Wajib Halal"
            className="mr-4 h-16 w-16"
          />
          <p className="text-left text-sm font-bold text-gray-700">
            Pengaduan Wajib Halal
          </p>
        </Link>

        <Link
          to="https://bpjph-ppid.kemenag.go.id/v5/"
          className="flex items-center rounded-lg border bg-white p-3 shadow-md hover:shadow-lg"
        >
          <StaticImage
            src={"../images/ppid.png"}
            alt="PPID"
            className="mr-4 h-12 w-16"
          />
          <p className="text-left text-sm font-bold text-gray-700">PPID</p>
        </Link>
      </div>
    </section>
  );
};

export default AdditionalSection;

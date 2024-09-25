import { Link } from "gatsby";
import React from "react";

export default function NotFoundPage() {
  const browser = typeof window !== "undefined" && window;
  return (
    <>
      {browser && (
        <section className="flex h-full items-center p-16">
          <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
            <div className="max-w-lg text-center">
              <h2 className="mb-8 text-9xl font-extrabold text-purple">404</h2>
              <p className="text-2xl font-semibold md:text-3xl">
                Maaf, halaman tidak ditemukan.
              </p>
              <Link
                rel="noopener noreferrer"
                href="/"
                className="rounded px-8 py-3 font-semibold text-purple"
              >
                Kembali ke halaman utama
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

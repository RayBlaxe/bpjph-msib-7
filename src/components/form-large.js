import React, { useState, useMemo } from "react";
import { navigate } from "gatsby";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "./button";
import TextInput from "./input";
import { FormattedMessage, useIntl } from "react-intl";

const SearchFormLarge = ({ type }) => {
  const [searchType, setSearchType] = useState("sertifikat");
  const intl = useIntl();

  // Define validation schemas for both types
  const FormSchema = useMemo(() => {
    if (searchType === "sertifikat") {
      return Yup.object().shape({
        nama_produk: Yup.string(),
        nama_pelaku_usaha: Yup.string(),
        no_sertifikat: Yup.string(),
      });
    }
    if (searchType === "produk_halal_ln") {
      return Yup.object().shape({
        nama_produk: Yup.string(),
        nama_importer: Yup.string(),
        no_registrasi: Yup.string(),
      });
    }
    return Yup.object();
  }, [searchType]);

  // Function to serialize form values
  const serialize = (obj) => {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p) && obj[p]) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  };

  // Function to handle form submission
  const getResult = (values) => {
    const value = serialize(values);
    navigate(`/search/${searchType}?${value}&page=1`, { replace: true });
  };

  // Define fields based on searchType
  const fields = useMemo(() => {
    if (searchType === "sertifikat") {
      return [
        {
          id: "nama_produk",
          translationId: "product_name",
          defaultTranslation: "Nama Produk",
        },
        {
          id: "nama_pelaku_usaha",
          translationId: "company_name",
          defaultTranslation: "Nama Pelaku Usaha",
        },
        {
          id: "no_sertifikat",
          translationId: "cert_no",
          defaultTranslation: "Nomor Sertifikat",
        },
      ];
    }
    if (searchType === "produk_halal_ln") {
      return [
        {
          id: "nama_produk",
          translationId: "product_name",
          defaultTranslation: "Nama Produk",
        },
        {
          id: "nama_importer",
          translationId: "importer_name",
          defaultTranslation: "Nama Importer",
        },
        {
          id: "no_registrasi",
          translationId: "registration_no",
          defaultTranslation: "Nomor Registrasi",
        },
      ];
    }
    return [];
  }, [searchType]);

  // Set initial values for the form
  const initialValues = useMemo(() => {
    return fields.reduce((prev, curr) => {
      return { ...prev, [curr.id]: "" };
    }, {});
  }, [fields]);

  if (!fields || fields.length === 0) return null;

  return (
    <>
      {/* Buttons to select search type */}
      <div className="mb-4 flex justify-center space-x-4">
        <button
          className={`font-semibold ${
            searchType === "sertifikat" ? "text-teal-500" : "text-gray-400"
          }`}
          onClick={() => setSearchType("sertifikat")}
          style={{ backgroundColor: "transparent", fontSize: "17px" }}
        >
          <FormattedMessage id="check" defaultMessage={"Cek"} />{" "}
          <span
            className={
              searchType === "sertifikat" ? "text-teal-500" : "text-gray-400"
            }
          >
            <FormattedMessage
              id="halal_product"
              defaultMessage={"Produk Halal"}
            />
          </span>
        </button>
        <button
          className={`font-semibold ${
            searchType === "produk_halal_ln" ? "text-teal-500" : "text-gray-400"
          }`}
          onClick={() => setSearchType("produk_halal_ln")}
          style={{ backgroundColor: "transparent", fontSize: "17px" }}
        >
          <FormattedMessage
            id="check_foreign_halal"
            defaultMessage={"Cek Registrasi Sertifikat Halal Luar Negeri"}
          />
        </button>
      </div>

      {/* Search Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={FormSchema}
        onSubmit={getResult}
      >
        {(props) => (
          <form className="mb-4" onSubmit={props.handleSubmit}>
            <div className="container mx-auto flex flex-col items-center justify-center">
              <div className="flex  w-full max-w-4xl flex-col gap-2 md:flex-row md:justify-center md:gap-1 lg:w-full">
                {fields.map((item, index) => (
                  <TextInput
                    key={`field-${index}`}
                    className="my-1 w-auto flex-grow border-2 border-purple md:my-0"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    id={item.id}
                    name={item.id}
                    value={props.values[item.id]}
                    autoComplete={"off"}
                    placeholder={intl.formatMessage({
                      id: item.translationId,
                      defaultMessage: item.defaultTranslation,
                    })}
                  />
                ))}
                <Button
                  className="mt-2 bg-purple md:mt-0 md:w-24"
                  type="submit"
                >
                  <FormattedMessage id="search" defaultMessage={"Cari"} />
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SearchFormLarge;

import React, { useState, useEffect, useMemo } from "react";
import { navigate } from "gatsby";
import { useLocation } from "@reach/router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "./button";
import TextInput from "./input";
import { FormattedMessage, useIntl } from "react-intl";

const SearchFormLarge = ({ type }) => {
  const [searchType, setSearchType] = useState(type || "sertifikat");
  const location = useLocation();
  const intl = useIntl();

  useEffect(() => {
    const pathType = location.pathname.split("/").pop();
    if (pathType) {
      setSearchType(pathType);
    }
  }, [location]);

  const fields = useMemo(() => {
    switch (searchType) {
      case "sertifikat":
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
      case "produk_halal_ln":
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
      case "data_lph":
        return [
          {
            id: "nama_lph",
            translationId: "lph_name",
            defaultTranslation: "Nama LPH",
          },
        ];
      case "data_lp3h":
        return [
          {
            id: "nama_lembaga",
            translationId: "lp3h_name",
            defaultTranslation: "Nama Lembaga",
          },
        ];
      case "data_p3h":
        return [
          {
            id: "nama",
            translationId: "p3h_name",
            defaultTranslation: "Nama",
          },
        ];
      case "data_lembaga_pelatihan":
        return [
          {
            id: "nama_lembaga",
            translationId: "training_institute_name",
            defaultTranslation: "Nama Lembaga",
          },
        ];
      default:
        return [];
    }
  }, [searchType]);

  // Define validation schemas
  const FormSchema = Yup.object().shape(
    Object.fromEntries(
      fields.map((field) => [
        field.id,
        Yup.string().min(3, "Minimal 3 karakter"),
      ])
    )
  );

  // Set initial values for the form
  const initialValues = useMemo(() => {
    return fields.reduce((prev, curr) => {
      return { ...prev, [curr.id]: "" };
    }, {});
  }, [fields]);

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
  const getResult = (values, { setSubmitting, setErrors }) => {
    const isValid = Object.values(values).some((value) => value.length >= 3);

    if (!isValid) {
      setErrors({
        form: "Minimal satu field harus diisi dengan 3 karakter atau lebih",
      });
      setSubmitting(false);
      return;
    }

    const value = serialize(values);
    let basePath = `/search/${searchType}`;
    navigate(`${basePath}?${value}&page=1`, { replace: true });
    setSubmitting(false);
  };

  if (!fields || fields.length === 0) return null;

  const isSingleField = fields.length === 1;
  const showTypeButtons =
    searchType === "sertifikat" || searchType === "produk_halal_ln";

  return (
    <>
      {showTypeButtons && (
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
              searchType === "produk_halal_ln"
                ? "text-teal-500"
                : "text-gray-400"
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
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={FormSchema}
        onSubmit={getResult}
        enableReinitialize={true}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="mb-4">
            <div
              className={`container mx-auto flex ${
                isSingleField ? "justify-start" : "justify-center"
              }`}
            >
              <div
                className={`flex ${
                  isSingleField ? "w-full max-w-xl" : "w-full max-w-4xl"
                } flex-col md:flex-row md:gap-1`}
              >
                {fields.map((item, index) => (
                  <div
                    key={`field-${index}`}
                    className={`mb-2 flex flex-col md:mb-0 ${
                      isSingleField ? "md:w-3/4" : "md:flex-grow"
                    }`}
                  >
                    <div className="relative">
                      <Field
                        as={TextInput}
                        className="w-full border-2 border-purple"
                        id={item.id}
                        name={item.id}
                        autoComplete="off"
                        placeholder={intl.formatMessage({
                          id: item.translationId,
                          defaultMessage: item.defaultTranslation,
                        })}
                      />
                      {errors[item.id] && touched[item.id] && (
                        <div className="absolute left-0 -bottom-5 text-xs text-red-500">
                          {errors[item.id]}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <Button
                  className={`mt-2 bg-purple md:mt-0 ${
                    isSingleField ? "md:w-1/4" : "md:w-24"
                  }`}
                  type="submit"
                  disabled={isSubmitting}
                >
                  <FormattedMessage id="search" defaultMessage={"Cari"} />
                </Button>
              </div>
            </div>
            {errors.form && (
              <div className="mt-2 text-center text-sm text-red-500">
                {errors.form}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SearchFormLarge;

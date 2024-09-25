import React from "react";
import { navigate } from "gatsby";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "./button";
import TextInput from "./input";
import { FormattedMessage, useIntl } from "react-intl";

const FormSchema = Yup.object().shape({
  nama_produk: Yup.string().min(3, "min_3_char").required("required"),
});

const localeContent = {
  min_3_char: {
    id: "Minimal 3 karakter",
    en: "Min 3 characters",
  },
  required: {
    id: "Harus diisi",
    en: "Required",
  },
  empty: {
    id: "Data tidak ditemukan",
    en: "Not found",
  },
  network_error: {
    id: "Sedang terjadi kesalahan, mohon coba kembali nanti",
    en: " Something happened, please try again later",
  },
  found: {
    id: "Ditemukan",
    en: "Found",
  },
  result: {
    id: "hasil",
    en: "result",
  },
};

const SearchForm = (props) => {
  const intl = useIntl();
  const className = props?.className;
  const serialize = (obj) => {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  };
  const getResult = (values) => {
    const value = serialize(values);
    navigate(`/search/sertifikat?${value}&page=1`, { replace: true });
  };

  return (
    <>
      <Formik
        initialValues={{
          nama_produk: "",
        }}
        validationSchema={FormSchema}
        onSubmit={getResult}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <div
              className={`flex flex-col justify-between md:flex-row ${className}`}
            >
              <TextInput
                className="flex-1"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
                id="nama_produk"
                name="nama_produk"
                autoComplete={"off"}
                placeholder={intl.formatMessage({
                  id: "product_name",
                  defaultMessage: "Nama Produk",
                })}
              />
              <Button
                className="ml-0 mt-2 max-w-full bg-purple md:ml-2 md:mt-0"
                type="submit"
              >
                <FormattedMessage id="search" defaultMessage={"Cari"} />
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SearchForm;

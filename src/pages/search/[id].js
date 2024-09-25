import React, { useEffect, useMemo } from "react";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import { navigate } from "gatsby";
import SearchFormLarge from "../../components/form-large";
import Table from "../../components/table";
import PrevButton from "../../components/prev-button";
import NextButton from "../../components/next-button";
import CircleLoading from "../../components/circle-loading";
import { useQuery } from "react-query";
import { FormattedMessage, useIntl } from "react-intl";

const sizePerPage = 20;
const SearchCertificationPage = (props) => {
  const seo = {
    metaTitle: "Pencarian Data",
    metaDescription: "Pencarian Data",
    shareImage: null,
  };

  return (
    <Layout as="article" {...props} locale="id">
      <Seo seo={seo} />
      <div className="mt-0 mb-3 md:mt-3">
        <SearchFormLarge type={props?.params?.id || "sertifikat"} />
      </div>
      <Component type={props?.params?.id || "sertifikat"} {...props} />
    </Layout>
  );
};

const ResultText = ({ isFetching, page, total }) => {
  const stop = Number(page) * sizePerPage;
  const start = Number(page) * sizePerPage + 1 - sizePerPage;
  if (isFetching) return <div />;
  if (total === 0) return null;
  return (
    <div className="my-4">
      <p className="text-base font-semibold">
        Hasil {start} hingga {sizePerPage < total ? stop : total} dari {total}
      </p>
      <div className="my-2 w-20 border-b-4 border-green" />
    </div>
  );
};

const Component = ({ type, ...props }) => {
  const intl = useIntl();

  const {
    data: response,
    error,
    isFetching,
    refetch,
    isError,
  } = useQuery({
    queryKey: "sertifikat",
    queryFn: async () => {
      let value = props?.location?.search;
      value ||= `?page=1`;
      try {
        const url = `${process.env.API_URL}/api/search/${type}${value}&size=${sizePerPage}`;
        const response = await fetch(url);
        const jsonResponse = await response.json();
        if (jsonResponse.statusCode !== 200) {
          throw new Error(jsonResponse.statusCode);
        }
        return jsonResponse;
      } catch (error) {
        throw error;
      }
    },
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [props.location.search, refetch]);

  const options = useMemo(() => {
    switch (type) {
      case "sertifikat":
        return [
          { label: "Nama Produk", key: "reg_prod_name" },
          { label: "Produsen", key: "pelaku_usaha.nama_pu" },
          { label: "Nomor Sertifikat", key: "sertifikat.no_sert" },
          { label: "Tanggal Terbit", key: "sertifikat.tgl_sert" },
        ];
      case "data_lph":
        return [
          { label: "Nama Lembaga", key: "nama_lph" },
          { label: "Jenis", key: "jenis" },
          { label: "Nomor Registrasi", key: "no_reg" },
          { label: "Layanan", key: "layanan" },
        ];
      case "data_lhln":
        return [
          {
            label: (
              <>
                {intl.formatMessage({
                  id: "nama_lhln",
                  defaultMessage: "Nama LHLN",
                })}
              </>
            ),
            key: "nama_lhln",
          },
          {
            label: (
              <>
                {intl.formatMessage({
                  id: "address",
                  defaultMessage: "Address",
                })}
              </>
            ),
            key: "negara",
          },
          {
            label: (
              <>
                {intl.formatMessage({
                  id: "ruang_lingkup",
                  defaultMessage: "Lingkup Kompetensi",
                })}
              </>
            ),
            key: "jenis",
          },
          // { label: "Kota, Negara", key: "negara" },
        ];
      case "data_lp3h":
        return [
          { label: "Nama", key: "nama_lembaga" },
          { label: "Alamat", key: "alamat" },
          { label: "Jenis", key: "jenis_lembaga" },
          { label: "Nomor Register", key: "no_register" },
        ];
      case "data_p3h":
        return [
          { label: "Nama", key: "nama" },
          { label: "Lembaga", key: "nama_lembaga" },
          { label: "Status", key: "status" },
          { label: "Nomor Register", key: "no_register" },
        ];
      case "data_lembaga_pelatihan":
        return [
          { label: "Nama Lembaga", key: "nama_lembaga" },
          { label: "alamat", key: "alamat" },
        ];
      case "data_penyelia":
        return [
          { label: "Nama Pelaku Usaha", key: "nama_pelaku_usaha" },
          { label: "Skala Usaha", key: "skala_usaha" },
          { label: "Nama Penyelia Halal", key: "nama_penyelia_halal" },
        ];
      case "data_auditor":
        return [
          { label: "Nama LPH", key: "nama_lph" },
          { label: "Nama Auditor", key: "nama_auditor_halal" },
          { label: "Nomor Register", key: "nomor_register" },
        ];
      default:
        return [];
    }
  }, [type]);

  const changePage = (value) => {
    if (isFetching || !response?.data) return;
    let search = props?.location?.search;
    let params = new URLSearchParams(search);
    let page = Number(params.get("page") || 1);
    params.set("page", page + value);
    navigate(`/search/${type}?${params.toString()}`, {
      replace: true,
    });
  };

  const showPrev = useMemo(() => {
    return !isFetching && response?.data?.current_page > 1;
  }, [isFetching, response?.data]);

  const showNext = useMemo(() => {
    return (
      !isFetching && response?.data?.current_page < response?.data?.total_pages
    );
  }, [isFetching, response?.data]);

  if (isError) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="container">
        <ResultText
          isFetching={isFetching}
          total={response?.data?.total_items}
          page={response?.data?.current_page}
        />
        {isFetching ? (
          <CircleLoading />
        ) : (
          <Table options={options} data={response?.data?.datas} />
        )}
        <div className="my-5 flex flex-col items-center justify-between">
          <div className="xs:mt-0 mt-2 inline-flex">
            {showPrev ? <PrevButton onClick={() => changePage(-1)} /> : <div />}
            {showNext ? <NextButton onClick={() => changePage(1)} /> : <div />}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchCertificationPage;

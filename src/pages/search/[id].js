import React, { useEffect, useMemo, useState} from "react";
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

const Component = ({ type, ...props }) => {
  const [searchParams, setSearchParams] = useState(new URLSearchParams(props.location.search));
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1', 10));

  const {
    data: response,
    error,
    isFetching,
    refetch,
    isError,
  } = useQuery({
    queryKey: [type, searchParams.toString()],
    queryFn: async () => {
      try {
        let url;
        if (type === "produk_halal_ln") {
          url = `https://gateway.halal.go.id/v1/shln/inquirycertificate?pagination[page]=${currentPage}&pagination[perPage]=${sizePerPage}&filter[ProductName]=${searchParams.get('nama_produk') || ''}&filter[ImporterName]=${searchParams.get('nama_importer') || ''}&filter[CertificateNumber]=${searchParams.get('no_registrasi') || ''}`;
        } else {
          // Ensure passing the correct parameters
          const params = new URLSearchParams(searchParams);
          params.set('page', currentPage.toString());
          params.set('size', sizePerPage.toString());
          
          switch(type) {
            case "data_lph":
              params.set('nama_lph', searchParams.get('nama_lph') || '');
              break;
            case "data_lp3h":
              params.set('nama_lembaga', searchParams.get('nama_lembaga') || '');
              break;
            case "data_p3h":
              params.set('nama', searchParams.get('nama') || '');
              break;
            case "data_lembaga_pelatihan":
              params.set('nama_lembaga', searchParams.get('nama_lembaga') || '');
              break;
          }
          
          url = `${process.env.API_URL}/api/search/${type}?${params.toString()}`;
        }
        console.log('Fetching URL:', url);
        
        const response = await fetch(url);
        const jsonResponse = await response.json();
        
        console.log('API Response:', jsonResponse);

        return jsonResponse;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    },
    enabled: false,
  });

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    setSearchParams(params);
    setCurrentPage(parseInt(params.get('page') || '1', 10));
  }, [props.location.search]);

  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);

  const changePage = (value) => {
    if (isFetching) return;
    
    const newPage = currentPage + value;
    setCurrentPage(newPage);
    
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", newPage.toString());
    setSearchParams(newParams);
    
    navigate(`/search/${type}?${newParams.toString()}`, { replace: true });
  };

  const options = useMemo(() => {
    switch (type) {
      case "sertifikat":
        return [
          { label: "Nama Produk", key: "reg_prod_name" },
          { label: "Produsen", key: "pelaku_usaha.nama_pu" },
          { label: "Nomor Sertifikat", key: "sertifikat.no_sert" },
          { label: "Tanggal Terbit", key: "sertifikat.tgl_sert" },
        ];
      case "produk_halal_ln":
        return [
          { label: "Nama Produk / Name of Product", key: "ProductName" },   
          { label: "Importer", key: "Company.ImporterName" },
          { label: "ID REG. NO.", key: "Certificate.CertificateNumber" },
          { label: "EXP. DATE", key: "Certificate.ExpDate" },
          { label: "MRA EXP. DATE", key: "LHLN.ExpMraDate" },
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

  const ResultText = ({ isFetching, currentPage, total }) => {
    if (isFetching || !total) return <div />;
  
    const start = (currentPage - 1) * sizePerPage + 1;
    const end = Math.min(currentPage * sizePerPage, total);
  
    return (
      <div className="my-4">
        <p className="text-base font-semibold">
          Hasil {start} hingga {end} dari {total}
        </p>
        <div className="my-2 w-20 border-b-4 border-green" />
      </div>
    );
  };

  const getData = () => {
    if (!response) {
      console.log('No response data');
      return { totalItems: 0, totalPages: 0, currentPage: 1, tableData: [] };
    }
    if (type === "produk_halal_ln") {
      const data = response.GETS_INQUIRYCERTIFICATE;
      return {
        totalItems: data.totalData,
        totalPages: data.totalPage,
        currentPage: data.currentPage,
        tableData: data.data || []
      };
    } else {
      console.log('Processing data for type:', type, response);
      return {
        totalItems: response.data?.total_items || 0,
        totalPages: response.data?.total_pages || 0,
        currentPage: response.data?.current_page || 1,
        tableData: response.data?.datas || []
      };
    }
  };

  const { totalItems, totalPages, currentPage: responsePage, tableData } = getData();
  console.log('Processed data:', { totalItems, totalPages, responsePage, tableDataLength: tableData.length }); // Debugging

  const showPrev = !isFetching && currentPage > 1;
  const showNext = !isFetching && currentPage < totalPages;

  if (isError) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="container">
        {/* debugging info */}
        {/* <pre style={{backgroundColor: '#f0f0f0', padding: '10px', fontSize: '12px'}}>
          Debug Info:
          isFetching: {isFetching.toString()}
          isError: {isError.toString()}
          totalItems: {totalItems}
          currentPage: {currentPage}
          tableData length: {tableData.length}
        </pre> */}
        <ResultText
          isFetching={isFetching}
          total={totalItems}
          currentPage={currentPage}
        />
        {isFetching ? (
          <CircleLoading />
        ) : (
          tableData.length > 0 ? (
            <Table options={options} data={tableData} />
          ) : (
            <p>Tidak ada hasil yang cocok.</p>
          )
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
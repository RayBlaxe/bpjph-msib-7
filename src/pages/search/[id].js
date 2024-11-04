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
const LPH_FETCH_SIZE = 100; // Maximum allowed fetch size
const TOTAL_LPH_RECORDS = 500; // Desired total records for LPH

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
  const [processedData, setProcessedData] = useState({ data: [], total: 0 });
  const [allLPHData, setAllLPHData] = useState([]); // all LPH data
  const [isLoadingLPH, setIsLoadingLPH] = useState(false);

  // fetch LPH data with pagination
  const fetchLPHData = async (searchTerm) => {
    setIsLoadingLPH(true);
    const allData = [];
    const numberOfCalls = Math.ceil(TOTAL_LPH_RECORDS / LPH_FETCH_SIZE);

    try {
      for (let page = 1; page <= numberOfCalls; page++) {
        const params = new URLSearchParams();
        params.set('page', page.toString());
        params.set('size', LPH_FETCH_SIZE.toString());
        params.set('nama_lph', searchTerm || '');

        const url = `${process.env.API_URL}/api/search/data_lph?${params.toString()}`;
        const response = await fetch(url);
        const jsonResponse = await response.json();

        if (jsonResponse.data?.datas) {
          allData.push(...jsonResponse.data.datas);
        }

        if (!jsonResponse.data?.datas || jsonResponse.data.datas.length < LPH_FETCH_SIZE) {
          break;
        }
      }

      setAllLPHData(allData);
    } catch (error) {
      console.error('Error fetching LPH data:', error);
    } finally {
      setIsLoadingLPH(false);
    }
  };

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
        // handling for LPH data
        if (type === "data_lph") {
          const searchTerm = searchParams.get('nama_lph') || '';
          await fetchLPHData(searchTerm);
          return { data: { datas: [] } };
        } else if (type === "produk_halal_ln") {
          url = `https://gateway.halal.go.id/v1/shln/inquirycertificate?pagination[page]=${currentPage}&pagination[perPage]=${sizePerPage}&filter[ProductName]=${searchParams.get('nama_produk') || ''}&filter[ImporterName]=${searchParams.get('nama_importer') || ''}&filter[CertificateNumber]=${searchParams.get('no_registrasi') || ''}`;
        } else {
          const params = new URLSearchParams(searchParams);
          params.set('page', currentPage.toString());
          params.set('size', sizePerPage.toString());
          
          switch(type) {
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
        
        if (url) {
          const response = await fetch(url);
          return await response.json();
        }
        
        return null;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    },
    enabled: false,
  });

// modify processLPHData
const processLPHData = (rawData, searchTerm = '') => {
  // validate input
  if (!Array.isArray(rawData)) {
    console.error('Raw data is not an array:', rawData);
    return {
      dataLPH: [],
      totalItemsLPH: 0,
      totalPagesLPH: 0,
      currentPageLPH: 1
    };
  }
  const lphMap = rawData.reduce((acc, curr) => {
    if (!curr) return acc;

    const key = [
      curr.nama_lph || '',
      curr.no_reg || '',
      curr.jenis || ''
    ].join('_');

    if (!acc[key]) {
      acc[key] = {
        ...curr,
        layanan: new Set(curr.layanan ? [curr.layanan] : [])
      };
    } else {
      if (curr.layanan) {
        acc[key].layanan.add(curr.layanan);
      }
    }
    return acc;
  }, {});

  // convert to array and format data
  let processedArray = Object.values(lphMap).map(item => ({
    ...item,
    layanan: Array.from(item.layanan).filter(Boolean).join(' | '),
    alamatlph: [
      item.namakabupaten,
      item.namaprovinsi
    ].filter(Boolean).join(', ')
  }));

  // Improved search filtering
  if (searchTerm) {
    const terms = searchTerm.toLowerCase().split(' ');
    processedArray = processedArray.filter(item => {
      const searchableText = [
        item.nama_lph,
        item.jenis,
        item.alamatlph,
        item.layanan
      ].filter(Boolean).join(' ').toLowerCase();
      
      return terms.every(term => searchableText.includes(term));
    });
  }

  // Debugging
  console.log('Total items after processing:', processedArray.length);
  if (processedArray.length === 0) {
    console.log('No items found. Search term:', searchTerm);
    console.log('First few raw items:', rawData.slice(0, 3));
  }

  // Calculate pagination
  const totalItems = processedArray.length;
  const totalPages = Math.ceil(totalItems / sizePerPage);
  const validCurrentPage = Math.min(Math.max(1, currentPage), Math.max(1, totalPages));
  const startIndex = (validCurrentPage - 1) * sizePerPage;
  const endIndex = startIndex + sizePerPage;
  const currentPageData = processedArray.slice(startIndex, endIndex);

  return {
    dataLPH: currentPageData,
    totalItemsLPH: totalItems,
    totalPagesLPH: totalPages,
    currentPageLPH: validCurrentPage
  };
};

// Modify for lph
useEffect(() => {
  if (type === "data_lph") {
    refetch().then(() => {
      console.log('LPH Data fetched:', allLPHData);
    }).catch(error => {
      console.error('Error fetching LPH data:', error);
    });
  }
}, [searchParams, refetch, type]);
  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    setSearchParams(params);
    setCurrentPage(parseInt(params.get('page') || '1', 10));
  }, [props.location.search]);

  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);

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
      return { totalItems: 0, totalPages: 0, currentPage: 1, tableData: [] };
    }

    if (type === "data_lph") {
      const searchTerm = searchParams.get('nama_lph') || '';
      const processed = processLPHData(allLPHData, searchTerm);
      return {
        totalItems: processed.totalItemsLPH,
        totalPages: processed.totalPagesLPH,
        currentPage: processed.currentPageLPH,
        tableData: processed.dataLPH
      };
    } else if (type === "produk_halal_ln") {
      const data = response.GETS_INQUIRYCERTIFICATE;
      return {
        totalItems: data.totalData,
        totalPages: data.totalPage,
        currentPage: data.currentPage,
        tableData: data.data || []
      };
    } else {
      return {
        totalItems: response.data?.total_items || 0,
        totalPages: response.data?.total_pages || 0,
        currentPage: response.data?.current_page || 1,
        tableData: response.data?.datas || []
      };
    }
  };

  const changePage = (value) => {
    if (isFetching) return;
    
    const newPage = currentPage + value;
    setCurrentPage(newPage);
    
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", newPage.toString());
    setSearchParams(newParams);
    
    // For LPH just update the URL
    if (type !== "data_lph") {
      navigate(`/search/${type}?${newParams.toString()}`, { replace: true });
    } else {
      navigate(`/search/${type}?${newParams.toString()}`, { replace: true });
    }
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
              { label: "Alamat / Address", key: "alamatlph" }, // Key sudah digabungkan
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


  const { totalItems, totalPages, currentPage: responsePage, tableData } = getData();
  
  const showPrev = !isFetching && currentPage > 1;
  const showNext = !isFetching && currentPage < totalPages;

  if (isError) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="container">
        <ResultText
          isFetching={isFetching || isLoadingLPH}
          total={totalItems}
          currentPage={currentPage}
        />
        {(isFetching || isLoadingLPH) ? (
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
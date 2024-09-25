import * as React from "react"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { useQuery } from "react-query";
import { useEffect } from "react";
import Button from "../../components/button";
import TextInput from "../../components/input";
import { FormattedMessage } from "react-intl";
import PrevButton from "../../components/prev-button";
import NextButton from "../../components/next-button";

export default function Sertifikat (props) {

   const seo = {
    metaTitle: "Pencarian Data",
    metaDescription: "Pencarian Data",
    shareImage: null,
  };

  return (
     <Layout as="article" {...props} locale="id">
        <Seo seo={seo} />
        <Component type={props?.params?.id || "sertifikat"} {...props} />
    </Layout>
  )
}

const ResultText = ({ isFetching, page, sizePerPage, total}) => {

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
    const [search, setSearch] = React.useState("")
    const [status, setStatus] = React.useState("")
    const [page, setPage] = React.useState(1)

    const {
        data: response,
        error,
        isFetching,
        refetch,
        isError,
    } = useQuery({
        queryKey: ["sertifikat", search, page, status],
        queryFn: async () => {
            const sizePerPage = 20; // Use sizePerPage from props, default to 10
            //let searchStatus = "&flag_statuses[]=PROCESS&flag_statuses[]=ACTIVE&flag_statuses[]= MoU&flag_statuses[]= MRA&flag_statuses[]=ASSESMENT PROCESS - CERTIFICATE ISSUED&flag_statuses[]=ASSESMENT PROCESS&flag_statuses[]=SCHEDULED"
            let searchStatus = null;
            
            if (status != "" && status != null) {
                searchStatus = "&flag_statuses[]=" + status
            }

            try {
                const url = `https://prod-api.halal.go.id/v1/referensi/data_lhln?nama_lhln=${search}&page=${page}&size=${sizePerPage}` + searchStatus;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        // 'X-System-Auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnby1ncnBjLWF1dGgtc3lzdGVtIiwiVXNlcmlkIjoiR3JlYXRFZHUiLCJFbWFpbEFkZHIiOiIifQ.CTJVcNmX_A_h88c0cA04rJs6GyhjaymtnZHQOLLdJHs',
                    }
                };
                
                const response = await fetch(url, options);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const jsonResponse = await response.json();
            
                return jsonResponse;
            } catch (error) {
                throw error;
            }
        },
        enabled: false,
    });

  useEffect(() => {
    refetch();
  }, [ search, status, page, refetch]);

  return (
     <React.Fragment>
            <div className="container mt-4">
                 <form className="mb-4" >
                    <div className="grid grid-flow-row-dense gap-2 sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-5">
                        <TextInput
                            key={`search_nama_lhln`}
                            className="my-1 w-auto border border-2 border-purple md:my-0"
                             onChange={(event) => {
                                setPage(1)
                                setSearch(event.target.value)
                            }}
                            // onBlur={props.handleBlur}
                            id={"nama_lhln"}
                            name={"nama_lhln"}
                            value={search}
                            autoComplete={"off"}
                            placeholder={"Nama LHLN / HCB Name"}
                        />
                        <select 
                            onChange={(event) => {
                                setPage(1)
                                setStatus(event.target.value)
                            }}
                            className={`bg-white-50 dark:bg-white-700 block w-full rounded-md border border-purple p-2.5 text-sm text-gray-900 placeholder-gray-400 focus:rounded-md my-1 w-auto border border-2 border-purple md:my-0`}>
                            <option value="">All</option>
                            <option value=" MoU">MoU</option>
                            <option value=" MRA">MRA</option>
                            <option value="ASSESMENT PROCESS - CERTIFICATE ISSUED">ASSESMENT PROCESS - CERTIFICATE ISSUED</option>
                            <option value="ASSESMENT PROCESS">ASSESMENT PROCESS</option>
                            <option value="SCHEDULED">SCHEDULED</option>
                        </select>
                        <Button
                             onClick={(e) => {
                                e.preventDefault();
                                refetch();
                            }}
                            className="mt-2 w-full bg-purple md:mt-0 md:w-24"
                            type="submit"
                        >
                            <FormattedMessage id="search" defaultMessage={"Cari"} />
                        </Button>
                    </div>
                </form>

                <ResultText isFetching={isFetching} page={page} sizePerPage={20} total={response?.data?.total_items || 1}/>

                <div className={`relative overflow-x-auto sm:rounded-lg mb-10`}>
                    <table className="w-full text-left text-sm">
                        <thead className="bg-purple text-xs uppercase text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                   No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                   Nama LHLN / HCB Name
                                </th>
                                 <th scope="col" className="px-6 py-3">
                                   Alamat / Address
                                </th>
                                 <th scope="col" className="px-6 py-3">
                                   Lingkup Kompetensi / Competency Scope
                                </th>
                                <th scope="col" className="px-6 py-3">
                                   Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {response?.data?.datas.map((item, index) => {
                            return (
                            <tr
                                key={`tr-${index}`}
                                    className={`border-b bg-white hover:bg-gray-50 border-b-1`}
                            >
                                <td key={`no${index}`} className="px-6 py-4">
                                    {index + 1 + (page * 20) - 20}
                                </td>
                                <td key={`nama${index}`} className="px-6 py-4">
                                    {item.nama_lhln}
                                </td>
                                 <td key={`lokasi${index}`} className="px-6 py-4">
                                    {item.lokasi}
                                </td>
                                 <td key={`jenis${index}`} className="px-6 py-4">
                                    {item.jenis}
                                </td>
                                 <td key={`status${index}`} className="px-6 py-4">
                                    {item.status}
                                </td>
                            </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>

                <div className="my-5 flex flex-col items-center justify-between">
                    <div className="xs:mt-0 mt-2 inline-flex">
                        {(page > 1) ? <PrevButton onClick={() => setPage(page - 1)} /> : <div />}
                        {(response?.data?.total_pages > page) ? <NextButton onClick={() => setPage(page + 1)} /> : <div />}
                    </div>
                </div>

            </div>
        </React.Fragment>
  );
};
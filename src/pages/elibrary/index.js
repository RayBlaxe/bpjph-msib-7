import * as React from "react"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { useQuery } from "react-query";
import { useEffect } from "react";

export default function Sertifikat(props) {

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

const Component = ({ type, ...props }) => {
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
            try {
                const url = `https://gateway.halal.go.id/v1/registration/inquiry/sertifikat${value}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json', // Adjust the Content-Type header as needed
                        'X-System-Auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnby1ncnBjLWF1dGgtc3lzdGVtIiwiVXNlcmlkIjoiR3JlYXRFZHUiLCJFbWFpbEFkZHIiOiIifQ.CTJVcNmX_A_h88c0cA04rJs6GyhjaymtnZHQOLLdJHs',
                    }
                };
                // const url = `${process.env.API_URL}/api/search/${type}${value}&size=${sizePerPage}`;
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
    }, [props.location.search, refetch]);

    console.log(response)

    return (
        <React.Fragment>
            <div className="container">
                <p class="my-4 pl-4 text-lg text-purple font-bold">e-library</p>
                {
                    response?.GETS_INQUIRYCERTIFICATE?.data?.length > 0 && (
                        <div>
                            <div className="flex flex-row justify-between p-4 mb-1 text-sm text-gray-700 rounded-lg" role="alert">
                                <div className="flex flex-col">
                                    <span className="font-medium">Nomor Sertifikat</span>
                                    <span className="font-medium italic text-purple">Certificate Number</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium">
                                        {
                                            response?.GETS_INQUIRYCERTIFICATE?.data[0].Sertifikat?.NoSertifikat
                                        }
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium"></span>
                                </div>
                            </div>

                            <div className="flex flex-row justify-between p-4 mb-1 text-sm text-gray-700 rounded-lg" role="alert">
                                <div className="flex flex-col">
                                    <span className="font-medium">Nama Pelaku Usaha</span>
                                    <span className="font-medium italic text-purple">Name of Company</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium">
                                        {
                                            response?.GETS_INQUIRYCERTIFICATE?.data[0].PelakuUsaha?.NamaPelakuUsaha
                                        }
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium"></span>
                                </div>
                            </div>

                            <div className="flex flex-row justify-between p-4 mb-1 text-sm text-gray-700 rounded-lg" role="alert">
                                <div className="flex flex-col">
                                    <span className="font-medium">Jenis Produk</span>
                                    <span className="font-medium italic text-purple">Type of Product</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium">
                                        {
                                            response?.GETS_INQUIRYCERTIFICATE?.data[0].Pengajuan?.JenisProduk
                                        }
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium"></span>
                                </div>
                            </div>


                        </div>
                    )
                }


                <div className={`relative overflow-x-auto sm:rounded-lg mb-10`}>
                    <table className="w-full text-left text-sm">
                        <thead className="bg-purple text-xs uppercase text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Nama Dokumen
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Dokumen
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {response?.GETS_INQUIRYCERTIFICATE?.data?.map((item, index) => {
                                return (
                                    <tr
                                        key={`tr-${index}`}
                                        className={`border-b bg-white hover:bg-gray-50 border-b-1`}
                                    >
                                        <td key={`td-option.${index}`} className="px-6 py-4">
                                            {item.NamaProduk}
                                        </td>
                                    </tr>
                                );
                            })} */}
                            <tr
                                key={`tr-kma`}
                                className={`border-b bg-white hover:bg-gray-50 border-b-1`}
                            >
                                <td key={`td-option.kma`} className="px-6 py-4">
                                    Undang-Undang RI
                                </td>
                                <td key={`td-option.kma`} className="px-6 py-4">
                                    <button className="bg-purple text-white p-2 rounded">
                                        Download
                                    </button>
                                </td>
                            </tr>
                            <tr
                                key={`tr-peraturan-pemerintah`}
                                className={`border-b bg-white hover:bg-gray-50 border-b-1`}
                            >
                                <td key={`td-option.peraturan-pemerintah`} className="px-6 py-4">
                                    Peraturan Pemerintah
                                </td>
                                <td key={`td-option.kma`} className="px-6 py-4">
                                    <button className="bg-purple text-white p-2 rounded">
                                        Download
                                    </button>
                                </td>
                            </tr>
                            <tr
                                key={`tr-peraturan-pemerintah`}
                                className={`border-b bg-white hover:bg-gray-50 border-b-1`}
                            >
                                <td key={`td-option.peraturan-pemerintah`} className="px-6 py-4">
                                   Perpres
                                </td>
                                <td key={`td-option.kma`} className="px-6 py-4">
                                    <button className="bg-purple text-white p-2 rounded">
                                        Download
                                    </button>
                                </td>
                            </tr>
                            <tr
                                key={`tr-peraturan-pemerintah`}
                                className={`border-b bg-white hover:bg-gray-50 border-b-1`}
                            >
                                <td key={`td-option.peraturan-pemerintah`} className="px-6 py-4">
                                    KMA
                                </td>
                                <td key={`td-option.kma`} className="px-6 py-4">
                                    <button className="bg-purple text-white p-2 rounded">
                                        Download
                                    </button>
                                </td>
                            </tr>
                            <tr
                                key={`tr-peraturan-pemerintah`}
                                className={`border-b bg-white hover:bg-gray-50 border-b-1`}
                            >
                                <td key={`td-option.peraturan-pemerintah`} className="px-6 py-4">
                                    PMA
                                </td>
                                <td key={`td-option.kma`} className="px-6 py-4">
                                    <button className="bg-purple text-white p-2 rounded">
                                        Download
                                    </button>
                                </td>
                            </tr>
                            <tr
                                key={`tr-peraturan-pemerintah`}
                                className={`border-b bg-white hover:bg-gray-50 border-b-1`}
                            >
                                <td key={`td-option.peraturan-pemerintah`} className="px-6 py-4">
                                    Peraturan BPJPH
                                </td>
                                <td key={`td-option.kma`} className="px-6 py-4">
                                    <button className="bg-purple text-white p-2 rounded">
                                        Download
                                    </button>
                                </td>
                            </tr>
                            <tr
                                key={`tr-peraturan-pemerintah`}
                                className={`border-b bg-white hover:bg-gray-50 border-b-1`}
                            >
                                <td key={`td-option.peraturan-pemerintah`} className="px-6 py-4">
                                    Keputusan Kepala BPJPH
                                </td>
                                <td key={`td-option.kma`} className="px-6 py-4">
                                    <button className="bg-purple text-white p-2 rounded">
                                        Download
                                    </button>
                                </td>
                            </tr>
                            <tr
                                key={`tr-peraturan-pemerintah`}
                                className={`border-b bg-white hover:bg-gray-50 border-b-1`}
                            >
                                <td key={`td-option.peraturan-pemerintah`} className="px-6 py-4">
                                   Peraturan Menteri Lainnya (Keungan PANRB)
                                </td>
                                <td key={`td-option.kma`} className="px-6 py-4">
                                    <button className="bg-purple text-white p-2 rounded">
                                        Download
                                    </button>
                                </td>
                            </tr>
                            {/* <tr
                                key={`tr-peraturan-pemerintah`}
                                className={`border-b bg-white hover:bg-gray-50 border-b-1`}
                            >
                                <td key={`td-option.peraturan-pemerintah`} className="px-6 py-4">
                                   Bukti SKP 2024
                                </td>
                                <td key={`td-option.kma`} className="px-6 py-4">
                                    <button className="bg-purple text-white p-2 rounded">
                                        Download
                                    </button>
                                </td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    );
};
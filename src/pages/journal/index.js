import * as React from "react";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import JurnalItem from "../../components/JurnalItem"; // Komponen item jurnal
import PrevButton from "../../components/prev-button";
import NextButton from "../../components/next-button";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function Sertifikat(props) {

    <br/> 
    const seo = {
        metaTitle: "Portal Jurnal",
        metaDescription: "Cari dan temukan jurnal di Portal Jurnal Halal",
        shareImage: null,
    };

    return (
        <Layout as="article" {...props} locale="id">
            <Seo seo={seo} />
            <Component type={props?.params?.id || "journal"} {...props} />
        </Layout>
    );
}

const Component = ({ type, ...props }) => {
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const { data: response, refetch, isFetching } = useQuery(
        ["journal", page],
        async () => {
            const url = `https://cms-kalender.halal.go.id/v2/researchresult?filter[Status]=Publish&pagination[perPage]=${pageSize}&pagination[page]=${page}`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    'X-System-Auth': 'your-auth-token', // Ganti dengan token otentikasi yang benar
                }
            };
            const response = await fetch(url, options);
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        },
        {
            enabled: !!page,
            keepPreviousData: true,
        }
    );

    useEffect(() => {
        refetch();
    }, [page, refetch]);

    const changePage = (increment) => {
        setPage((prevPage) => prevPage + increment);
    };

    const ResultText = ({ isFetching, page, total }) => {
        if (isFetching || !total) return <div />;
      
        const startResult = (page - 1) * pageSize + 1;
        const endResult = Math.min(page * pageSize, response?.total || 0);
        
        return (
            <div className="my-4">
                <p className="text-base font-semibold">
                    Hasil {startResult} hingga {endResult} dari {total}
                </p>
                <div className="my-2 w-20 border-b-4 border-green" />
            </div>
        );
    };

    const totalPages = Math.ceil((response?.total || 0) / pageSize);
    const showPrev = !isFetching && page > 1;
    const showNext = !isFetching && page < totalPages;

    return (
        <div className="portal-jurnal-container">
            {/* Bagian Header */}
           
<div className="header-section">
  <h1 className="portal-title">Portal Jurnal</h1>
  <div className="search-bar">
    <input type="text" placeholder="Cari Jurnal ..." />
    <button className="search-button">
      <FiSearch style={{ color: "#5B2C8A" }} />
    </button>
  </div>
</div>

            {/* Bagian Daftar Jurnal */}
            <div className="jurnal-list-section">
                <div className="login">
                    <a href="https://inovasi.halal.go.id/#/login" target="_blank" rel="noopener noreferrer">
                        <button className="login-button">Masuk</button>
                    </a>
                </div>
                <h2 className="daftar-jurnal-title">Daftar Jurnal</h2>
                
                {/* Menampilkan teks hasil */}
                <ResultText isFetching={isFetching} page={page} total={response?.total} />

                {response?.data?.map((jurnal, index) => (
                    <JurnalItem
                        key={index}
                        title={jurnal.Title || ''}
                        author={jurnal.Executor || ''}
                        pIssn="123-45" // Placeholder untuk P-ISSN
                        eIssn="678-10" // Placeholder untuk E-ISSN
                        subjectArea={jurnal.DataResearchScope?.Name || ''}
                        downloadCount={200} // Nilai default
                        viewCount={300} // Nilai default
                    />
                ))}

                {/* Kontrol Navigasi */}
                <div className="my-5 flex flex-col items-center justify-between">
                    <div className="xs:mt-0 mt-2 inline-flex">
                        {showPrev ? <PrevButton onClick={() => changePage(-1)} /> : <div />}
                        {showNext ? <NextButton onClick={() => changePage(1)} /> : <div />}
                    </div>
                </div>
            </div>
        </div>
    );
};

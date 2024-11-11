import React, { useState } from 'react'; 
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import SearchIcon from "../../components/SearchIcon";
import PdfIcon from "../../components/PdfIcon";
import { FiFileText } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import PublicationInfo from "../../components/PublicationInfo";
import { FiEye, FiDownload } from "react-icons/fi";
import { FormattedMessage } from 'react-intl';
import { FiBookOpen, FiTag } from 'react-icons/fi';
import "../../styles/JurnalItem.css"; // Import CSS file

const dummyJournals = [
  { title: "Peran Sertifikasi Halal dalam Meningkatkan Kepercayaan Konsumen di Pasar Global", publisher: "Lembaga Sertifikasi Halal", tags: "Halal, Ekonomi",  issn: "P-ISSN: 1234-5678 | E-ISSN: 8765-4321", id: 1 },
  { title: "Inovasi Produk Halal untuk Meningkatkan Daya Saing di Pasar Internasional", publisher: "Universitas Islam Jakarta", tags: "Halal, Inovasi Produk",  issn: "P-ISSN: 1234-5678 | E-ISSN: 8765-4321", id: 2 },
  { title: "Strategi Pemasaran Produk Halal dalam Meningkatkan Kesadaran Konsumen", publisher: "Institut Agama Islam", tags: "Pemasaran, Halal",  issn: "P-ISSN: 1234-5678 | E-ISSN: 8765-4321", id: 3 },
  { title: "Pengaruh Sertifikasi Halal terhadap Kepercayaan Konsumen di Industri Makanan", publisher: "Pusat Penelitian Halal", tags: "Sertifikasi Halal, Makanan",  issn: "P-ISSN: 1234-5678 | E-ISSN: 8765-4321", id: 4 },
];

const JournalPage = () => {
  const [viewCount, setViewCount] = useState(100); // Example default value
  const [downloadCount, setDownloadCount] = useState(50); // Example default value
  return (
    <Layout>
      <Seo seo={{ metaTitle: "Portal Jurnal", metaDescription: "Detailed view of the journal portal" }} />

    

      

      {/* Konten Jurnal */}
      <div className="containerDua">
        <div className="detailSatu">
          <h1 className="contentTitleSatu">Peran Sertifikasi Halal dalam Meningkatkan Kepercayaan Konsumen di Pasar Global</h1>
          <div className="metaSatu">
            <span className="publisherSatu">Publisher: BPJPH</span>
            <button className="pdfButtonSatu">
              <FiFileText style={{ marginRight: "5px", fontSize: "20px" }} />
              PDF
            </button>
          </div>
          <div className="infoSatu">
            <a href="#" className="authorLinkSatu">Dr. Aisyah Rizqi, M.Sc. Dr. Aisyah Rizqi, M.Sc.  </a>
          </div>
          <hr style={{ border: '0', borderTop: '2px solid purple', width: '100%' }} /> <br/>
          <h2 className="contentTitleeSatu">Abstrak : </h2>
          <div className="abstractSatu">
            <p>
            Penelitian ini menganalisis peran sertifikasi halal dalam meningkatkan kepercayaan konsumen di pasar global. 
            Dengan meningkatnya kesadaran konsumen akan pentingnya produk halal, terutama di kalangan masyarakat Muslim, 
            sertifikasi halal menjadi salah satu faktor utama yang mempengaruhi keputusan pembelian. Studi ini mengeksplorasi bagaimana
             sertifikasi halal dapat menjadi alat pemasaran efektif bagi produsen dan perusahaan dalam menarik konsumen global, baik Muslim 
             maupun non-Muslim, yang mencari produk berkualitas dan terpercaya. Menggunakan pendekatan kualitatif dengan metode studi kasus 
             di beberapa perusahaan yang telah mengadopsi sertifikasi halal, penelitian ini mengungkap dampak sertifikasi halal pada citra 
             merek dan loyalitas konsumen. Hasil penelitian menunjukkan bahwa sertifikasi halal tidak hanya membantu perusahaan membangun 
             kepercayaan konsumen, tetapi juga meningkatkan daya saing produk di pasar global.
            </p>
          </div>

          <PublicationInfo />
          

          <hr style={{ border: '0', borderTop: '2px solid purple', width: '100%' }} /> <br/>

          <h2 className="contentTitleeSatu">Referensi : </h2>
          <div className="abstractSatu">
            <p>
            Rizqi, A. (2021). Peran Sertifikasi Halal dalam Meningkatkan Kepercayaan Konsumen di Pasar Global. Universitas Islam Negeri Syarif Hidayatullah Jakarta.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center' }}>
              
            </div>
          </div>

          <hr style={{ border: '0', borderTop: '2px solid purple', width: '100%' }} /> <br/>

          <div className="jurnal-stats">
  <h2 className="contentTitleeSatu">Metrik : </h2>
  <div className="metrics-container">
    <span className="views">
      <FiEye /> Views: {viewCount}
    </span>
    <span className="downloads">
      <FiDownload /> Downloads: {downloadCount}
    </span>
  </div>
</div>   
        </div>
     {/* Sidebar Jurnal Terbaru */}
<div className="sidebarSatu">
  <h1 className="text-md mb-3 border-b-2 border-green font-semibold text-fontPrimary">
    <FormattedMessage id="Jurnal Terkini" defaultMessage={"Jurnal Terkini"} />
  </h1>
  {dummyJournals.map((journal) => (
  <div className="recentCardSatu" key={journal.id}>
    <div className="recentInfoSatu">
      <h4>{journal.title}</h4>
      <div className="infoRow">
        <span className="issn">
          <FiBookOpen style={{ marginRight: '5px' }} /> {journal.issn}
        </span>
        <span className="tagsSatu">
          <FiTag style={{ marginRight: '5px', color: '#670075'  }} /> {journal.tags}
        </span>
      </div>
      <a href="#" className="seeMoreSatu">Selengkapnya →</a>
    </div>
  </div>
))}

        </div>
      </div>
    </Layout>
  );
};

export default JournalPage;

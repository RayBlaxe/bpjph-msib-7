import React from 'react';

const PublicationInfo = () => {
    const paragraphStyle = {
      fontSize: "15px",
      fontWeight: "bold",
      marginBottom: "3px",
      color: "#333"
    };
  
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px 0',
        fontSize: '16px',
        lineHeight: '1.5',
      }}>
      {/* Left Column */}
      <div>
        <p style={paragraphStyle}>Publisher: BPJPH</p>
        <p style={paragraphStyle}>Halaman: 1234 - 678762</p>
      </div>
      
      {/* Right Column */}
      <div>
        <p style={paragraphStyle}>P-ISSN: 1234-5678 | E-ISSN: 8765-4321</p>
        <p style={paragraphStyle}>Tanggal Publikasi: 02, Oktober 2024</p>
      </div>
    </div>
  );
};

export default PublicationInfo;

import React from "react";
import '../styles/JurnalItem.css';

const JurnalItem = ({ title, author, pIssn, eIssn, subjectArea, downloadCount, viewCount }) => {
  return (
    <div className="jurnal-item">
      <div className="jurnal-content">
        <h3 className="title"> {title}</h3>
        <p className="author">🖊️ Author: {author}</p>
        <div className="issn-subject-container">
          <p className="issn">📖 P-ISSN: {pIssn} | E-ISSN: {eIssn}</p>
          <p className="subject-area">🔍 Subject Area: {subjectArea}</p>
        </div>
        <div className="jurnal-stats">
          <span className="views">👁️ Views: {viewCount}</span>
          <span className="downloads">⬇️ Downloads: {downloadCount}</span>
          <a href="#" className="jurnal-link">Selengkapnya →</a>
        </div>
      </div>
    </div>
  );
};

export default JurnalItem;
import React from "react";
import { FiEdit, FiBook, FiSearch, FiEye, FiDownload } from "react-icons/fi";
import '../styles/JurnalItem.css';

const JurnalItem = ({ title, author, pIssn, eIssn, subjectArea, downloadCount, viewCount }) => {
  return (
    <div className="jurnal-item">
      <div className="jurnal-content">
        <h3 className="title">{title}</h3>
        <p className="author">
          <FiEdit /> Author: {author}
        </p>
        <div className="issn-subject-container">
          <p className="issn">
            <FiBook /> P-ISSN: {pIssn} | E-ISSN: {eIssn}
          </p>
          <p className="subject-area">
            <FiSearch /> Subject Area: {subjectArea}
          </p>
        </div>
        <div className="jurnal-stats">
          <span className="views">
            <FiEye /> Views: {viewCount}
          </span>
          <span className="downloads">
            <FiDownload /> Downloads: {downloadCount}
          </span>
          <a href="detailjournal" className="jurnal-link">
            Selengkapnya →
          </a>
        </div>
      </div>
    </div>
  );
};

export default JurnalItem;

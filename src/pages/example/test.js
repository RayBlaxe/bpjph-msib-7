import React, { useEffect, useState } from "react";

const CertificateTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetching data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://gateway.halal.go.id/v1/shln/inquirycertificate?pagination[page]=1&pagination[perPage]=10&filter[ProductName]="
        );
        const result = await response.json();
        setData(result.GETS_INQUIRYCERTIFICATE.data); // Accessing data in the response
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Certificate Table</h1>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>HS Code</th>
            <th>Company</th>
            <th>Importer</th>
            <th>Certificate Number</th>
            <th>Issued Date</th>
            <th>Expiration Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.ProductName}</td>
              <td>{item.HsCode}</td>
              <td>{item.Company.CompanyName}</td>
              <td>{item.Company.ImporterName}</td>
              <td>{item.Certificate.CertificateNumber}</td>
              <td>{item.Certificate.IssuedDate}</td>
              <td>{item.Certificate.ExpDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CertificateTable;

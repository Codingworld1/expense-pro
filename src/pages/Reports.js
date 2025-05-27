import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Reports.css";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/reports", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Convert array of "YYYY-MM" strings to objects with month and year
        const mappedReports = response.data.map((slug) => {
          const [year, monthNum] = slug.split("-");
          return {
            slug,
            year: parseInt(year, 10),
            month: monthNames[parseInt(monthNum, 10) - 1],
          };
        });

        setReports(mappedReports);
      } catch (err) {
        setError(err.response?.data || "Failed to fetch reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <p className="loading-message">Loading reports...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className="reports-container">
      <h2 className="reports-heading">Monthly Reports</h2>
      <p className="reports-para">Click a month to view detailed expenses.</p>

      <div className="report-list">
        {reports.map((report, index) => (
          <Link
            to={`/manager/reports/${report.slug}`}
            key={index}
            className="report-item"
          >
            <div className="report-info">
              <h4>{report.month} {report.year} Report</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Reports;

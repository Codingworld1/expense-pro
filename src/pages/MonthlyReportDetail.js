import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../styles/MonthlyReportDetail.css";

const MonthlyReportDetail = () => {
  const { monthYear } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reference to the report content for PDF export
  const reportRef = useRef(null);

  useEffect(() => {
    if (!monthYear) return;

    const fetchReport = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8080/api/reports/${monthYear}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReport(response.data);
      } catch (err) {
        if (err.response && err.response.data) {
          setError(
            typeof err.response.data === "string"
              ? err.response.data
              : JSON.stringify(err.response.data)
          );
        } else {
          setError(err.message);
        }
        setReport(null);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [monthYear]);

  const exportPDF = () => {
    if (!reportRef.current) return;

    html2canvas(reportRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Expense_Report_${report.monthYear}.pdf`);
    });
  };

  if (!monthYear) {
    return <div className="monthly-report-detail">Please select a month to view the report.</div>;
  }

  if (loading) {
    return <div className="monthly-report-detail">Loading report...</div>;
  }

  if (error) {
    return <div className="monthly-report-detail error">Error: {error}</div>;
  }

  if (!report) {
    return null;
  }

  return (
    <div className="monthly-report-detail">
      <div className="report-header">
        <h2>Expense Report for {report.monthYear}</h2>
        <button className="export-pdf-button" onClick={exportPDF}>
          Export to PDF
        </button>
      </div>
      <div ref={reportRef}>
        <p>
          Total Amount: <strong>₹{report.totalAmount.toFixed(2)}</strong>
        </p>
        <p>
          Approved: {report.approvedCount} | Rejected: {report.rejectedCount}
        </p>

        <table className="expense-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Status</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {report.expenses && report.expenses.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No expenses found for this month.
                </td>
              </tr>
            ) : (
              report.expenses?.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.id}</td>
                  <td>{expense.description}</td>
                  <td>{expense.amount.toFixed(2)}</td>
                  <td>{expense.category}</td>
                  <td>{expense.date}</td>
                  <td>{expense.status}</td>
                  <td>{expense.userName}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyReportDetail;

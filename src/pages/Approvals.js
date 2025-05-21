import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Approvals.css";

const Approvals = () => {
  const [approvals, setApprovals] = useState([]);

  const fetchApprovals = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/expenses/pending", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const sortedData = response.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setApprovals(sortedData);
    } catch (error) {
      console.error("Error fetching pending approvals:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:8080/api/expenses/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchApprovals();
    } catch (error) {
      console.error(`Error updating status to ${status} for ID ${id}:`, error);
    }
  };

  useEffect(() => {
    fetchApprovals();
  }, []);

  return (
    <div className="approvals-container">
      <h2>Pending Approvals</h2>
      <p className="approvals-subtitle">
        Review and take action on employee-submitted expense requests.
      </p>
      <div className="approval-list">
        {approvals.map((expense) => {
          const attachments = expense.attachments || [];
          return (
            <div key={expense.id} className="approval-item expanded">
              <div className="approval-top">
                <div className="approval-info">
                  <h4>{expense.userName || "Employee"}</h4>
                  <p>{expense.category}</p>
                  <p>{expense.date}</p>
                </div>
                <div className="approval-meta">
                  <span className="amount">₹{expense.amount}</span>
                  <div className="approval-actions">
                    <button
                      className="approve-btn"
                      onClick={() => updateStatus(expense.id, "APPROVED")}
                    >
                      Approve
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => updateStatus(expense.id, "REJECTED")}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>

              <div className="approval-details">
                <p>
                  <strong>Description:</strong> {expense.description}
                </p>

                {expense.notes && (
                  <p>
                    <strong>Notes:</strong> {expense.notes}
                  </p>
                )}

                {attachments.length > 0 ? (
                  <div className="attachments-section">
                    <p><strong>Attachments:</strong></p>
                    <ul className="attachments-list">
                      {attachments.map((fileUrl, index) => {
                        const fileName = decodeURIComponent(fileUrl.split("/").pop());
                        const fullFileUrl = `http://localhost:8080${fileUrl}`;
                        return (
                          <li key={index}>
                            <a
                              href={fullFileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="attachment-link"
                            >
                              {fileName}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : (
                  <p><strong>Attachments:</strong> None</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Approvals;

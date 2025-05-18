import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Approvals.css";

const Approvals = () => {
  const [approvals, setApprovals] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const fetchApprovals = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/expenses/pending", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setApprovals(response.data);
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
      // Refresh the list after updating
      fetchApprovals();
    } catch (error) {
      console.error(`Error updating status to ${status} for ID ${id}:`, error);
    }
  };

  const parseAttachments = (attachmentString) => {
    if (!attachmentString) return [];
    try {
      return JSON.parse(attachmentString);
    } catch {
      return [];
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
          const attachments = parseAttachments(expense.attachments);
          return (
            <div
              key={expense.id}
              className={`approval-item ${expandedId === expense.id ? "expanded" : ""}`}
            >
              {/* Toggle expand only on this top section */}
              <div className="approval-top" onClick={() => toggleExpand(expense.id)}>
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
                      onClick={(e) => {
                        e.stopPropagation();
                        updateStatus(expense.id, "APPROVED");
                      }}
                    >
                      Approve
                    </button>
                    <button
                      className="reject-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateStatus(expense.id, "REJECTED");
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>

              {expandedId === expense.id && (
                <div className="approval-details">
                  <p>
                    <strong>Description:</strong> {expense.description}
                  </p>
                  <p>
                    <strong>Attachment:</strong>{" "}
                    {attachments.length > 0 ? (
                      attachments.map((url, i) => (
                        <a
                          key={i}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: "block", marginTop: "4px" }}
                        >
                          View Attachment {i + 1}
                        </a>
                      ))
                    ) : (
                      "None"
                    )}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Approvals;

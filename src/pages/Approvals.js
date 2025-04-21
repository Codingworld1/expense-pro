import React, { useState } from "react";
import "../styles/Approvals.css";

const Approvals = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const approvals = [
    {
      id: 1,
      employee: "Arjun Reddy",
      amount: "₹3,200",
      category: "Client Meeting",
      date: "2025-04-05",
      status: "Pending",
      description: "Lunch meeting with client at The Park.",
      attachment: "/uploads/receipt1.pdf",
    },
    {
      id: 2,
      employee: "Priya Sharma",
      amount: "₹1,850",
      category: "Travel",
      date: "2025-04-08",
      status: "Pending",
      description: "Cab from airport to office",
      attachment: "",
    },
    {
      id: 3,
      employee: "Ravi Kumar",
      amount: "₹950",
      category: "Office Supplies",
      date: "2025-04-09",
      status: "Pending",
      description: "Printer ink and A4 paper",
      attachment: "/uploads/receipt3.pdf",
    },
  ];

  return (
    <div className="approvals-container">
      <h2>Pending Approvals</h2>
      <p className="approvals-subtitle">Review and take action on employee-submitted expense requests.</p>
      <div className="approval-list">
        {approvals.map((expense) => (
          <div
            key={expense.id}
            className={`approval-item ${expandedId === expense.id ? "expanded" : ""}`}
            onClick={() => toggleExpand(expense.id)}
          >
            <div className="approval-top">
              <div className="approval-info">
                <h4>{expense.employee}</h4>
                <p>{expense.category}</p>
                <p>{expense.date}</p>
              </div>
              <div className="approval-meta">
                <span className="amount">{expense.amount}</span>
                <div className="approval-actions">
                  <button className="approve-btn" onClick={(e) => e.stopPropagation()}>
                    Approve
                  </button>
                  <button className="reject-btn" onClick={(e) => e.stopPropagation()}>
                    Reject
                  </button>
                </div>
              </div>
            </div>
            <div className="approval-details">
              <p>
                <strong>Description:</strong> {expense.description}
              </p>
              <p>
                <strong>Attachment:</strong>{" "}
                {expense.attachment ? (
                  <a href={expense.attachment} target="_blank" rel="noopener noreferrer">
                    View Attachment
                  </a>
                ) : (
                  "None"
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Approvals;

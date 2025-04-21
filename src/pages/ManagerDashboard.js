import { useState } from "react";
import "../styles/Dashboard.css"; // You can rename this too if needed

const getStatusIcon = (status) => {
  switch (status) {
    case "approved":
      return "✅";
    case "pending":
      return "⏳";
    case "rejected":
      return "❌";
    default:
      return "❓";
  }
};

const DashboardManager = () => {
  const [pendingApprovals, setPendingApprovals] = useState([
    { id: 1, name: "Team lunch", amount: 1200, status: "pending", submittedBy: "John", daysAgo: 2 },
    { id: 2, name: "Office supplies", amount: 300, status: "pending", submittedBy: "James", daysAgo: 1 },
  ]);

  const [recentExpenses, setRecentExpenses] = useState([
    { id: 1, name: "Team lunch", amount: 1200, status: "approved" },
    { id: 2, name: "Office staplers", amount: 300, status: "pending" },
    { id: 3, name: "Printer cartridge", amount: 3000, status: "rejected" },
  ]);

  const handleApprove = (id) => {
    setPendingApprovals((prev) => prev.filter((approval) => approval.id !== id));
    setRecentExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, status: "approved" } : expense
      )
    );
  };

  const handleReject = (id) => {
    setPendingApprovals((prev) => prev.filter((approval) => approval.id !== id));
    setRecentExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, status: "rejected" } : expense
      )
    );
  };

  return (
    <div className="dm-dashboard-container">
      {/* Dashboard Header (removed sidebar related content) */}
      <div className="dm-dashboard-header"></div>

      {/* Summary Cards Section */}
      <div className="dm-summary-cards">
        <div className="dm-summary-card">
          <h3 className="dm-card-label">Total Expenses</h3>
          <p className="dm-card-value">₹ 10,000</p>
        </div>
        <div className="dm-summary-card">
          <h3 className="dm-card-label">Pending Approval</h3>
          <p className="dm-card-value">{pendingApprovals.length}</p>
        </div>
        <div className="dm-summary-card">
          <h3 className="dm-card-label">Expenses this Month</h3>
          <p className="dm-card-value">₹ 1,000</p>
        </div>
        <div className="dm-summary-card">
          <h3 className="dm-card-label">Budget Utilized</h3>
          <p className="dm-card-value">42%</p>
        </div>
      </div>

      {/* Recent Expenses Section */}
      <div className="dm-section dm-recent-expenses">
        <div className="dm-expenses-header">
          <h2 className="dm-expenses-title">Recent Expenses</h2>
          <button className="dm-view-all-btn">View all</button>
        </div>
        <div className="dm-expenses-list">
          {recentExpenses.map((expense) => (
            <div className="dm-expense-item" key={expense.id}>
              <div className="dm-expense-name">{expense.name}</div>
              <div className="dm-expense-status">{getStatusIcon(expense.status)}</div>
              <div className="dm-expense-amount">₹{expense.amount}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Approvals Section */}
      <div className="dm-section dm-approvals">
        <div className="dm-expenses-header">
          <h2 className="dm-expenses-title">Your Approvals</h2>
        </div>

        {pendingApprovals.length > 0 ? (
          <div className="dm-approval-list">
            {pendingApprovals.map((approval) => (
              <div key={approval.id} className="dm-approval-item">
                <div className="dm-approval-name">{approval.name}</div>
                <div className="dm-approval-info">
                  Submitted by {approval.submittedBy} • {approval.daysAgo} days ago
                </div>
                <div className="dm-approval-actions">
                  <span className="dm-approval-amount">₹{approval.amount}</span>
                  <button className="dm-approve-btn" onClick={() => handleApprove(approval.id)}>
                    Approve
                  </button>
                  <button className="dm-reject-btn" onClick={() => handleReject(approval.id)}>
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="dm-no-approvals">No pending approvals</div>
        )}
      </div>
    </div>
  );
};

export default DashboardManager;

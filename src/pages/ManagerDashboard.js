import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const DashboardManager = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // Make sure you store JWT here after login
    // Handler for View all button
  const handleViewAllClick = () => {
    navigate("/manager/team-expenses"); // navigate to the expenses page route
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/dashboard/manager", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDashboardData(res.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:8080/api/dashboard/manager/expenses/${id}/approve`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDashboardData((prev) => ({
        ...prev,
        pendingApprovals: prev.pendingApprovals.filter((e) => e.id !== id),
        recentExpenses: prev.recentExpenses.map((e) =>
          e.id === id ? { ...e, status: "APPROVED" } : e
        ),
      }));
    } catch (error) {
      console.error("Approval failed", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(`http://localhost:8080/api/dashboard/manager/expenses/${id}/reject`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDashboardData((prev) => ({
        ...prev,
        pendingApprovals: prev.pendingApprovals.filter((e) => e.id !== id),
        recentExpenses: prev.recentExpenses.map((e) =>
          e.id === id ? { ...e, status: "REJECTED" } : e
        ),
      }));
    } catch (error) {
      console.error("Rejection failed", error);
    }
  };


  // Helper function to calculate days ago from date string
  const getDaysAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) return <p>Loading dashboard...</p>;
  if (!dashboardData) return <p>Failed to load dashboard data.</p>;

  return (
    <div className="dm-dashboard-container">
      {/* Summary Cards Section */}
      <div className="dm-summary-cards">
        <div className="dm-summary-card">
          <h3 className="dm-card-label">Total Expenses</h3>
          <p className="dm-card-value">₹ {dashboardData.totalExpenses}</p>
        </div>
        <div className="dm-summary-card">
          <h3 className="dm-card-label">Pending Approval</h3>
          <p className="dm-card-value">{dashboardData.pendingApprovals.length}</p>
        </div>
        <div className="dm-summary-card">
          <h3 className="dm-card-label">Expenses this Month</h3>
          <p className="dm-card-value">₹ {dashboardData.expensesThisMonth}</p>
        </div>
        <div className="dm-summary-card">
          <h3 className="dm-card-label">Budget Utilized</h3>
          <p className="dm-card-value">{dashboardData.budgetUtilized}%</p>
        </div>
      </div>

      {/* Recent Expenses */}
      <div className="dm-section dm-recent-expenses">
        <div className="dm-expenses-header">
          <h2 className="dm-expenses-title">Recent Expenses</h2>
          <button className="dm-view-all-btn" onClick={handleViewAllClick}>View all</button>
        </div>
        <div className="dm-expenses-list">
          {dashboardData.recentExpenses.map((expense, index) => (
            <div className="dm-expense-item" key={index}>
              <div className="dm-expense-name">{expense.description}</div>
              <div className="dm-expense-status">{expense.status}</div>
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

        {dashboardData.pendingApprovals.length > 0 ? (
          <div className="dm-approval-list">
            {dashboardData.pendingApprovals.map((approval) => (
              <div key={approval.id} className="dm-approval-item">
                <div className="dm-approval-name">{approval.description}</div>
                <div className="dm-approval-info">
                  Submitted by {approval.submittedBy} • {getDaysAgo(approval.daysAgo)} days ago
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

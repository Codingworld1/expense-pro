import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // import useNavigate
import "../styles/Dashboard.css";

const EmployeeDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // initialize navigate

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // Assuming token is stored in localStorage
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:8080/api/dashboard/employee", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDashboardData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load dashboard data");
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>{error}</div>;

  const { totalExpenses, pendingApprovalCount, monthlyExpenses, recentExpenses } = dashboardData;

  // Handler for View all button
  const handleViewAllClick = () => {
    navigate("/employee/my-expenses"); // navigate to the expenses page route
  };

  return (
    <div className="dm-dashboard-container">
      {/* Summary Cards */}
      <div className="dm-summary-cards">
        <div className="dm-summary-card">
          <h3 className="dm-card-label">Total Expenses</h3>
          <p className="dm-card-value">₹ {totalExpenses.toFixed(2)}</p>
        </div>
        <div className="dm-summary-card">
          <h3 className="dm-card-label">Pending Approval</h3>
          <p className="dm-card-value">{pendingApprovalCount}</p>
        </div>
        <div className="dm-summary-card">
          <h3 className="dm-card-label">Expenses this Month</h3>
          <p className="dm-card-value">₹ {monthlyExpenses.toFixed(2)}</p>
        </div>
      </div>

      {/* Recent Expenses */}
      <div className="dm-section">
        <div className="dm-expenses-header">
          <h2 className="dm-expenses-title">Recent Expenses</h2>
          <button className="dm-view-all-btn" onClick={handleViewAllClick}>View all</button>
        </div>
        <div className="dm-expenses-list">
          {recentExpenses.length === 0 && <p>No recent expenses found.</p>}
          {recentExpenses.map((exp, idx) => (
            <div key={idx} className="dm-expense-item">
              <div className="dm-expense-name">{exp.description}</div>
              <div className="dm-expense-status">{exp.status}</div>
              <div className="dm-expense-amount">₹{exp.amount.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom"; 
import "../styles/Dashboard.css";

const EmployeeDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if token is present in URL query parameters
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      // Save token to localStorage
      localStorage.setItem("token", tokenFromUrl);

      // Remove token from URL (clean URL)
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);

      // Set default Axios header
      axios.defaults.headers.common["Authorization"] = `Bearer ${tokenFromUrl}`;
    } else {
      // No token in URL, try from localStorage
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      } else {
        // No token at all, redirect to login
        navigate("/");
        return; // prevent fetching dashboard data
      }
    }

    // Fetch dashboard data
    const fetchDashboard = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/dashboard/employee");
        setDashboardData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load dashboard data");
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [location, navigate]);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>{error}</div>;

  const { totalExpenses, pendingCount, monthlyExpenses, recentExpenses } = dashboardData;

  const handleViewAllClick = () => {
    navigate("/employee/my-expenses");
  };

  return (
    <div className="dm-dashboard-container">
      <div className="dm-summary-cards">
        <div className="dm-summary-card">
          <h3 className="dm-card-label">Total Expenses</h3>
          <p className="dm-card-value">₹ {totalExpenses.toFixed(2)}</p>
        </div>
        <div className="dm-summary-card">
          <h3 className="dm-card-label">Pending Approval</h3>
          <p className="dm-card-value">{pendingCount}</p>
        </div>
        <div className="dm-summary-card">
          <h3 className="dm-card-label">Expenses this Month</h3>
          <p className="dm-card-value">₹ {monthlyExpenses.toFixed(2)}</p>
        </div>
      </div>

      <div className="dm-section">
        <div className="dm-expenses-header">
          <h2 className="dm-expenses-title">Recent Expenses</h2>
          <button className="dm-view-all-btn" onClick={handleViewAllClick}>
            View all
          </button>
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

// src/pages/EmployeeDashboard.js
import "../styles/Dashboard.css";

const EmployeeDashboard = () => {
  return (
    <div className="dm-dashboard-container">
      {/* Summary Cards */}
      <div className="dm-summary-cards">
        <div className="dm-summary-card">
          <h3 className="dm-card-label">Total Expenses</h3>
          <p className="dm-card-value">₹ 10,000</p>
        </div>
        <div className="dm-summary-card">
          <h3 className="dm-card-label">Pending Approval</h3>
          <p className="dm-card-value">5</p>
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

      {/* Recent Expenses */}
      <div className="dm-section">
        <div className="dm-expenses-header">
          <h2 className="dm-expenses-title">Recent Expenses</h2>
          <button className="dm-view-all-btn">View all</button>
        </div>
        <div className="dm-expenses-list">
          <div className="dm-expense-item">
            <div className="dm-expense-name">Team lunch</div>
            <div className="dm-expense-status">✅</div>
            <div className="dm-expense-amount">₹1200</div>
          </div>
          <div className="dm-expense-item">
            <div className="dm-expense-name">Office staplers</div>
            <div className="dm-expense-status">⏳</div>
            <div className="dm-expense-amount">₹300</div>
          </div>
          <div className="dm-expense-item">
            <div className="dm-expense-name">Printer cartridge</div>
            <div className="dm-expense-status">❌</div>
            <div className="dm-expense-amount">₹3000</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

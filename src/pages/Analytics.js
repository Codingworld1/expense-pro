import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../styles/Analytics.css";

const Analytics = () => {
  const [summary, setSummary] = useState(null);
  const [departmentWiseData, setDepartmentWiseData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [animateKey, setAnimateKey] = useState(0); // key to force rerender

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:8080/api/analytics/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data;
        setSummary({
          totalReports: data.totalReports,
          totalExpenses: data.totalExpenses,
          totalApproved: data.totalApproved,
          totalRejected: data.totalRejected,
          avgPerReport: data.avgPerReport,
        });
        setDepartmentWiseData(data.departmentWiseData);
        setStatusData(data.statusData);

        // Force a key change after data loads to trigger animation
        setTimeout(() => setAnimateKey((prev) => prev + 1), 100);
      })
      .catch((err) => {
        console.error("Error fetching analytics:", err);
      });
  }, []);

  const COLORS = ["#00C49F", "#FFC107", "#FF6B6B"];

  if (!summary) return <p>Loading analytics...</p>;

  return (
    <div className="analytics-container">
      <h2 className="analytics-heading">Expense Analytics</h2>
      <p className="analytics-subheading">Insights based on recent reports</p>

      <div className="summary-cards">
        <div className="summary-card">
          <h3>Total Reports</h3>
          <p>{summary.totalReports}</p>
        </div>
        <div className="summary-card">
          <h3>Total Expenses</h3>
          <p>₹{summary.totalExpenses.toLocaleString()}</p>
        </div>
        <div className="summary-card">
          <h3>Total Approved</h3>
          <p>₹{summary.totalApproved.toLocaleString()}</p>
        </div>
        <div className="summary-card">
          <h3>Total Rejected</h3>
          <p>₹{summary.totalRejected.toLocaleString()}</p>
        </div>
        <div className="summary-card">
          <h3>Avg. Per Report</h3>
          <p>₹{summary.avgPerReport.toLocaleString()}</p>
        </div>
      </div>

      <div className="chart-section">
        <div className="chart-container">
          <h4>Department-wise Expenses</h4>
          <ResponsiveContainer width="100%" height={300} key={`bar-${animateKey}`}>
            <BarChart data={departmentWiseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="amount"
                fill="#8884d8"
                barSize={50}
                isAnimationActive={true}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h4>Approval Status</h4>
          <ResponsiveContainer width="100%" height={300} key={`pie-${animateKey}`}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                isAnimationActive={true}
                animationDuration={1500}
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

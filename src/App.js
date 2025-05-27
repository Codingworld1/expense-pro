import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import DashboardLayout from "./layouts/DashboardLayout";
import ResetPasswordPage from "./pages/ResetPasswordPage";

// Manager pages
import ManagerDashboard from "./pages/ManagerDashboard";
import TeamExpenses from "./pages/TeamExpenses";  // New page for team expenses
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import ManagerExpenses from "./pages/ManagerExpenses";
import Approvals from "./pages/Approvals";
import ManagerNewExpense from "./pages/ManagerNewExpense";
import MonthlyReportDetail from "./pages/MonthlyReportDetail";


// Employee pages
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeExpenses from "./pages/Expenses";
import EmployeeNewExpense from "./pages/NewExpense";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing/Login Page */}
        <Route path="/" element={<Landing />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Manager Routes */}
        <Route path="/manager" element={<DashboardLayout />}>
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="team-expenses" element={<TeamExpenses />} />  {/* Added Team Expenses Route */}
          <Route path="approvals" element={<Approvals />} />
          <Route path="reports" element={<Reports />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="my-expenses" element={<ManagerExpenses />} />
          <Route path="new-expense" element={<ManagerNewExpense />} />
          <Route path="reports/:monthYear" element={<MonthlyReportDetail />} />
        </Route>

        {/* Employee Routes */}
        <Route path="/employee" element={<DashboardLayout />}>
          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route path="my-expenses" element={<EmployeeExpenses />} />
          <Route path="new-expense" element={<EmployeeNewExpense />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

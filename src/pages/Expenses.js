import React, { useState } from "react";
import "../styles/Expenses.css";

const Expenses = () => {
  const [filter, setFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const expenses = [
    {
      id: 1,
      description: "Team lunch",
      amount: "₹1200",
      category: "Food",
      date: "2025-04-06",
      status: "Approved",
      notes: "Lunch at The Leela with the marketing team",
    },
    {
      id: 2,
      description: "Airport cab",
      amount: "₹850",
      category: "Travel",
      date: "2025-04-08",
      status: "Pending",
      notes: "Ola ride from airport to office",
    },
    {
      id: 3,
      description: "Printer ink",
      amount: "₹500",
      category: "Office Supplies",
      date: "2025-04-09",
      status: "Rejected",
      notes: "Bought ink for HP printer",
    },
  ];

  // Filter and search (case-insensitive)
  const filteredExpenses = expenses.filter((exp) => {
    const matchesFilter = filter === "All" || exp.status === filter;
    const search = searchQuery.toLowerCase();
    const matchesSearch =
      exp.description.toLowerCase().includes(search) ||
      exp.category.toLowerCase().includes(search) ||
      exp.date.includes(search);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="expenses-container">
      <h2 className="expenses-heading">My Expenses</h2>
      <p className="expenses-para">Track and manage your expenses</p>

      <div className="expenses-controls">
        <input
          type="text"
          placeholder="Search"
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="filters">
          <button className="all-btn" onClick={() => setFilter("All")}>All</button>
          <button className="approved-btn" onClick={() => setFilter("Approved")}>Approved</button>
          <button className="pending-btn" onClick={() => setFilter("Pending")}>Pending</button>
          <button className="rejected-btn" onClick={() => setFilter("Rejected")}>Rejected</button>
        </div>
      </div>

      <div className="expense-list">
        {filteredExpenses.length > 0 ? (
          filteredExpenses.map((expense) => (
            <div
              key={expense.id}
              className={`expense-item ${expandedId === expense.id ? "expanded" : ""}`}
              onClick={() => toggleExpand(expense.id)}
            >
              <div className="expense-top">
                <div className="expense-info">
                  <h4>{expense.description}</h4>
                  <p>{expense.category}</p>
                  <p>{expense.date}</p>
                  <span className="amount">{expense.amount}</span>
                </div>
                <div className="expense-meta">
                  <p className={`status-${expense.status.toLowerCase()}`}>{expense.status}</p>
                </div>
              </div>
              <div className="expense-details">
                <p><strong>Notes:</strong> {expense.notes}</p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: "#999", fontStyle: "italic", marginTop: "20px" }}>
            No such expense found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Expenses;

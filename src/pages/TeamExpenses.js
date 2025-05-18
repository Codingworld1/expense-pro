import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/TeamExpenses.css";

const TeamExpenses = () => {
  const [filter, setFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  useEffect(() => {
    const fetchTeamExpenses = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token"); // if needed for auth
        const response = await axios.get("http://localhost:8080/api/expenses/team-expenses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // if needed for cookie/session
        });

        if (Array.isArray(response.data)) {
          setExpenses(response.data);
        } else {
          setError("Invalid data format from server");
          setExpenses([]);
        }
      } catch (err) {
        console.error("Error fetching team expenses:", err);
        setError("Failed to load team expenses.");
        setExpenses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamExpenses();
  }, []);

  // Filter and search (case-insensitive), safely handle undefined fields
  const filteredExpenses = (expenses || []).filter((exp) => {
    const expStatus = (exp.status || "").toLowerCase();
    const currentFilter = filter.toLowerCase();

    const matchesFilter = filter === "All" || expStatus === currentFilter;
    const search = searchQuery.toLowerCase();

    const matchesSearch =
      (exp.description || "").toLowerCase().includes(search) ||
      (exp.category || "").toLowerCase().includes(search) ||
      (exp.date || "").includes(search);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="team-expenses-container">
      <h2 className="team-expenses-heading">Team Expenses</h2>
      <p className="team-expenses-para">Track and manage your team's expenses</p>

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

      {loading && <p>Loading team expenses...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="expense-list">
        {!loading && filteredExpenses.length > 0 ? (
          filteredExpenses.map((expense) => (
            <div
              key={expense.id}
              className={`expense-item ${expandedId === expense.id ? "expanded" : ""}`}
              onClick={() => toggleExpand(expense.id)}
            >
              <div className="expense-top">
                <div className="expense-info">
                  <h4>{expense.description || "No Description"}</h4>
                  <p>{expense.category || "No Category"}</p>
                  <p>{expense.date || "No Date"}</p>
                  <span className="amount">₹{expense.amount ?? "0"}</span>
                </div>
                <div className="expense-meta">
                  <p className={`status-${(expense.status || "").toLowerCase()}`}>
                    {expense.status || "Unknown"}
                  </p>
                </div>
              </div>
              {expandedId === expense.id && (
                <div className="expense-details">
                  <p><strong>Notes:</strong> {expense.notes || "No notes available."}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          !loading && (
            <p style={{ color: "#999", fontStyle: "italic", marginTop: "20px" }}>
              No such expense found.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default TeamExpenses;

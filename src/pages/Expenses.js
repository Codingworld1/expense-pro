import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/Expenses.css";

const Expenses = () => {
  const [filter, setFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const detailsRefs = useRef({});

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found. Please login.");

        const response = await axios.get("http://localhost:8080/api/expenses", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(response.data)) {
          setExpenses(response.data);
          setError(null);
        } else {
          setError("Invalid data format from server");
          setExpenses([]);
        }
      } catch (err) {
        console.error("Error fetching expenses:", err);
        if (err.message.includes("No authentication token")) {
          setError(err.message);
        } else if (err.response && err.response.status === 401) {
          setError("Unauthorized. Please login again.");
        } else {
          setError("Failed to load expenses.");
        }
        setExpenses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  useEffect(() => {
    Object.entries(detailsRefs.current).forEach(([id, el]) => {
      if (!el) return;
      if (parseInt(id, 10) === expandedId) {
        el.classList.add("expanded");
        el.style.height = el.scrollHeight + "px";

        const removeHeight = () => {
          el.style.height = "auto";
          el.removeEventListener("transitionend", removeHeight);
        };
        el.addEventListener("transitionend", removeHeight);
      } else {
        el.style.height = el.scrollHeight + "px"; // set current height before collapsing
        void el.offsetHeight; // force reflow
        el.style.height = "0px";
        el.classList.remove("expanded");
      }
    });
  }, [expandedId]);

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

      {loading && <p>Loading expenses...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="expense-list">
        {!loading && filteredExpenses.length > 0 ? (
          filteredExpenses.map((expense) => (
            <div
              key={expense.id}
              className={`expense-item ${expandedId === expense.id ? "expanded" : ""}`}
              onClick={() => toggleExpand(expense.id)}
              style={{ cursor: "pointer" }}
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
              <div
                ref={(el) => (detailsRefs.current[expense.id] = el)}
                className="expense-details"
              >
                <p><strong>Notes:</strong> {expense.notes || "No notes available."}</p>
                {expense.attachments && expense.attachments.length > 0 && (
                  <div className="attachments-section">
                    <p><strong>Attachments:</strong></p>
                    <ul className="attachments-list">
                      {expense.attachments.map((fileUrl, index) => {
                        const fileName = decodeURIComponent(fileUrl.split("/").pop());
                        const fullFileUrl = `http://localhost:8080${fileUrl}`;
                        return (
                          <li key={index}>
                            <a href={fullFileUrl} target="_blank" rel="noopener noreferrer">
                              {fileName}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
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

export default Expenses;
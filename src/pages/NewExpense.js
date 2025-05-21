import React, { useState } from "react";
import axios from "axios";
import { Upload } from "lucide-react";
import "../styles/NewExpense.css";
import Toast from "./Toast";

const NewExpense = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [attachments, setAttachments] = useState(null);
  const [notes, setNotes] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastError, setToastError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setToastMessage("You must be logged in to submit an expense.");
        setToastError(true);
        return;
      }

      const formData = new FormData();

      const expenseData = {
        description,
        amount: parseFloat(amount),
        category,
        date,
        notes,
      };

      formData.append(
        "expense",
        new Blob([JSON.stringify(expenseData)], { type: "application/json" })
      );

      if (attachments) {
        for (let i = 0; i < attachments.length; i++) {
          formData.append("attachments", attachments[i]);
        }
      }

      if (attachments && attachments.length > 0) {
        await axios.post(
          "http://localhost:8080/api/expenses/with-attachments",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post("http://localhost:8080/api/expenses", expenseData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setToastMessage("Expense Submitted Successfully!");
      setToastError(false);
      handleClear();
    } catch (error) {
      console.error("Error submitting expense:", error);
      setToastMessage("Failed to submit expense. Please try again.");
      setToastError(true);
    }
  };

  const handleClear = () => {
    setDescription("");
    setAmount("");
    setCategory("");
    setDate("");
    setAttachments(null);
    setNotes("");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    setAttachments(e.dataTransfer.files);
  };

  return (
    <div className="expense-container">
      <div className="title-wrapper">
        <h1 className="page-title">New Expense</h1>
        <p className="page-subtitle">Enter the details of your new expense</p>
      </div>
      <div className="content-wrapper">
        <main className="main-content">
          <div className="form-container">
            <form onSubmit={handleSubmit} className="expense-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="₹0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select</option>
                    <option value="travel">Travel</option>
                    <option value="food">Food</option>
                    <option value="office">Office Supplies</option>
                    <option value="software">Software</option>
                    <option value="marketing">Marketing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label>Notes (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Additional details about the expense"
                />
              </div>

              <div className="form-group full-width">
                <label>Attachments</label>
                <label
                  htmlFor="fileInput"
                  className={`upload-box ${dragOver ? "drag-over" : ""}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  style={{ cursor: "pointer" }}
                >
                  <Upload size={32} />
                  <input
                    id="fileInput"
                    type="file"
                    multiple
                    onChange={(e) => setAttachments(e.target.files)}
                    className="hidden"
                  />
                  <span>Drag & Drop files here or click to upload</span>
                </label>

                {attachments && attachments.length > 0 && (
                  <div className="attachments-list">
                    <strong>Selected files:</strong>
                    <ul>
                      {[...attachments].map((file, idx) => (
                        <li key={idx}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Submit
                </button>
                <button type="button" className="clear-btn" onClick={handleClear}>
                  Clear All
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>

      {toastMessage && <Toast message={toastMessage} isError={toastError} />}
    </div>
  );
};

export default NewExpense;

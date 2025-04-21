import React, { useState } from "react";
import { Upload } from "lucide-react";
import "../styles/NewExpense.css";
import Toast from "./Toast";

const NewExpense = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [attachments, setAttachments] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ description, amount, category, date, attachments });
    setToastMessage("Expense Submitted Successfully!");
  };

  const handleClear = () => {
    setDescription("");
    setAmount("");
    setCategory("");
    setDate("");
    setAttachments(null);
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
                <label>Attachments</label>
                <div
                  className={`upload-box ${dragOver ? "drag-over" : ""}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload size={32} />
                  <input
                    type="file"
                    onChange={(e) => setAttachments(e.target.files)}
                    className="hidden"
                  />
                  <span>Drag & Drop files here or click to upload</span>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Submit
                </button>
                <button
                  type="button"
                  className="clear-btn"
                  onClick={handleClear}
                >
                  Clear All
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>

      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
};

export default NewExpense;

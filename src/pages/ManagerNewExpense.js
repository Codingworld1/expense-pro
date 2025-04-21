import React, { useState } from "react";
import { Upload } from "lucide-react";
import "../styles/NewExpense.css";

const NewExpense = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [attachments, setAttachments] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ description, amount, category, date, attachments });
  };

  const handleClear = () => {
    setDescription("");
    setAmount("");
    setCategory("");
    setDate("");
    setAttachments(null);
  };

  return (
    <div className="main-container">
      <div className="title-wrapper">
        <h1 className="page-title">New Expense</h1>
        {/* Subtitle added here */}
        <p className="page-subtitle">Enter the details of your new expense below</p>
      </div>

      <div className="content-wrapper">
        <main className="main-content">
          <div className="form-container">
            <form onSubmit={handleSubmit} className="expense-form">
              <h2 className="form-title">Expense Details</h2>

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
                <div className="upload-box">
                  <Upload size={32} />
                  <input
                    type="file"
                    onChange={(e) => setAttachments(e.target.files)}
                    className="hidden"
                  />
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
    </div>
  );
};

export default NewExpense;

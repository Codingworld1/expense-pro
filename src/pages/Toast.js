import React, { useState, useEffect } from "react";
import "../styles/Toast.css";

const Toast = ({ message }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000); // Hide after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="toast">
      {message}
    </div>
  );
};

export default Toast;

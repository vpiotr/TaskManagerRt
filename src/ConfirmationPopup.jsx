// src/ConfirmationPopup.jsx
import React, { useEffect } from "react";

function ConfirmationPopup({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "Enter") {
        onConfirm();
      }
    };

    // Add event listener
    document.addEventListener("keydown", handleKeyDown);

    // Remove event listener on cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onConfirm]); // Ensure effect runs only if onClose changes

  return (
    <div className="popup">
      <div className="popup-inner">
        <p>{message}</p>
        <button onClick={onConfirm} className="confirm-btn">
          Confirm
        </button>
        <button onClick={onClose} className="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmationPopup;

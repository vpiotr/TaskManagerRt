// src/ConfirmationPopup.jsx
import React from 'react';

function ConfirmationPopup({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div className="popup">
      <div className="popup-inner">
        <p>{message}</p>
        <button onClick={onConfirm} className="confirm-btn">Confirm</button>
        <button onClick={onClose} className="cancel-btn">Cancel</button>
      </div>
    </div>
  );
}

export default ConfirmationPopup;
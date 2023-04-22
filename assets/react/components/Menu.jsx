import React, { useState } from 'react';

function Modal({ isOpen, onClose, children }) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  const closeModal = () => {
    setIsModalOpen(false);
    onClose && onClose();
  };

  return isModalOpen ? (
    <div className="modal">
      <div className="modal-content">
        {children}
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  ) : null;
}

export default Modal;

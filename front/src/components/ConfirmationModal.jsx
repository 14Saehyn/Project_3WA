import React from 'react';
import Modal from 'react-modal';

const ConfirmationModal = ({isOpen, message, onConfirm, onCancel}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onCancel} className="confirmation-modal-content" overlayClassName="confirmation-modal">
      <p>Êtes-vous sûr ?</p>
        <button onClick={onCancel}>Non</button>
        <button onClick={onConfirm}>Oui</button>
    </Modal>
  );
};

export default ConfirmationModal;

import Modal from 'react-modal';

const ConfirmationModal = ({isOpen, onConfirm, onCancel}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onCancel} className="confirmation-modal-content" overlayClassName="confirmation-modal">
      <p>Êtes-vous sûr ?</p>
      <div className="button-container">
        <button onClick={onCancel}>Non</button>
        <button onClick={onConfirm}>Oui</button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
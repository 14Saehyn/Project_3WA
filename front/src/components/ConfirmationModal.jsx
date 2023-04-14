import Modal from 'react-modal';

const ConfirmationModal = ({isOpen, onConfirm, onCancel}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onCancel} className="confirmation-modal-content" overlayClassName="confirmation-modal">
      <p className="modal_text">Êtes-vous sûr ?</p>
      <div className="button-container">
        <button onClick={onCancel} className="modal_text">Non</button>
        <button onClick={onConfirm} className="modal_text">Oui</button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
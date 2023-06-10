import React,{ useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalDiv } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal =({ onClose, children }) => {
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };  

  useEffect(() => {
    const handleEscapeClick = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscapeClick);
    return () => {
      window.removeEventListener('keydown', handleEscapeClick);
    }

  }, [onClose])
  
  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalDiv>{children}</ModalDiv>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
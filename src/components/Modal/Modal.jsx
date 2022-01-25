import { useEffect } from 'react';
import { BsXCircle } from "react-icons/bs";
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalBackdrop, 
         ModalContent, 
         CloseBtn } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({onClose, children}) => {

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown, {
      once: true
    });
  }, []);

  const handleBackdropClickClose = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

    return createPortal(
      <ModalBackdrop onClick={handleBackdropClickClose}>
        <CloseBtn onClick={onClose}>
          <BsXCircle size={40}/>
        </CloseBtn>
        <ModalContent>{children}</ModalContent>
      </ModalBackdrop>,
      modalRoot,
    );
};

Modal.propTypes = {
  onClose: PropTypes.func
};
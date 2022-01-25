import React, { Component } from 'react';
import { BsXCircle } from "react-icons/bs";
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalBackdrop, 
         ModalContent, 
         CloseBtn } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    console.log('Modal ComponentDidMount');

    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    console.log('Modal ComponentWillUnmount');

    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClickClose = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <ModalBackdrop onClick={this.handleBackdropClickClose}>
        <CloseBtn onClick={this.props.onClose}>
          <BsXCircle size={40}/>
        </CloseBtn>
        <ModalContent>{this.props.children}</ModalContent>
      </ModalBackdrop>,
      modalRoot,
    );
  }
};

Modal.propTypes = {
  onClose: PropTypes.func
};
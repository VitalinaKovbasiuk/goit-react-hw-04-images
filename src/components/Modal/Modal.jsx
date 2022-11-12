// import { Component } from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Overlay, ModalImg } from './Modal.styled';

export default function Modal({ toggleModal, largeImage }) {
  useEffect(() => {
    const handleKeyDown = e => e.code === 'Escape' && toggleModal();

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleModal]);

  // const handleKeyDown = e => {
  //   e.code === 'Escape' && toggleModal();
  // };

  const handleBackdropClick = e => {
    e.target === e.currentTarget && toggleModal();
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalImg>
        <img src={largeImage} alt="" />
      </ModalImg>
    </Overlay>
  );
}

Modal.prototypes = {
  toggleModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};

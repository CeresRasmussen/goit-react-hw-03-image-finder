import React, { Component } from 'react';
import css from 'components/Modal/Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  // state = { showModal: false };
  componentDidMount() {
    window.addEventListener('keydown', this.onEscClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscClick);
  }

  onEscClick = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onBackdropClick = e => {
    if (e.currentTarget !== e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { imageURL, tags } = this.props;

    return createPortal(
      <div
        className={css.Overlay}
        onClick={(this.onBackdropClick, this.props.onClose)}
      >
        <div className={css.Modal}>
          <img src={imageURL} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

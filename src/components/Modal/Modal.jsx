import React, { Component } from 'react';
import css from 'components/Modal/Modal.module.css';

export class Modal extends Component {
  render() {
    return (
      <div className={css.Overlay}>
        <div className={css.Modal}>
          <img src="" alt="" />
        </div>
      </div>
    );
  }
}

import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';
// import { Modal } from 'components/Modal/Modal';
import React, { Component } from 'react';

export class ImageGalleryItem extends Component {
  render() {
    const { images, takeDataImage } = this.props;
    return (
      images.length !== 0 &&
      images.map(({ id, webformatURL, tags, largeImageURL }) => {
        return (
          <li className={css.ImageGalleryItem} key={id} onClick={takeDataImage}>
            <img
              src={webformatURL}
              data-large={largeImageURL}
              alt={tags}
              className={css['ImageGalleryItem-image']}
            />
          </li>
        );
      })
    );
  }
}

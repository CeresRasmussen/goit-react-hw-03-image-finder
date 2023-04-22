import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ images }) => {
  return (
    images.length !== 0 &&
    images.map(({ id, largeImageURL, webformatURL }) => {
      return (
        <li className={css.ImageGalleryItem} key={id}>
          <img
            src={webformatURL}
            alt=""
            className={css['ImageGalleryItem-image']}
          />
        </li>
      );
    })
  );
};

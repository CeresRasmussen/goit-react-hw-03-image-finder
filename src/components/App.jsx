import React, { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { LoadMoreBtn } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import css from 'components/App.module.css';
import { fetchImages } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    images: [],
    totalHits: null,
    query: '',
    page: 1,
    loading: false,
    showModal: false,
    alt: '',
    largeURL: '',
  };

  // constructor(props) {
  //   super(props);
  // this.galleryRef = React.createRef();
  // }

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    // const galleryElement = this.galleryRef.current;
    if (page !== 1) {
      window.scrollBy({
        top: 660,
        behavior: 'smooth',
      });
    }

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ loading: true });
      const {
        data: { hits, totalHits },
      } = await fetchImages(query, page);
      if (page === Math.ceil(totalHits / 12)) {
        toast.info('This is all we found');
      }
      hits.length
        ? this.setState(prevState => ({
            images: [...prevState.images, ...this.normalaziedImage(hits)],
            totalHits,
            loading: false,
          }))
        : toast.warn("Sorry, we couldn't find anything;( Try another query.");
      this.setState({ loading: false });
    }
  }

  normalaziedImage(array) {
    return array.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));
  }

  onSubmitForm = query => {
    this.setState({ query, page: 1, images: [] });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  takeDataImage = e => {
    const {
      alt,
      dataset: { large: largeURL },
    } = e.target;
    this.setState(state => ({
      showModal: !state.showModal,
      largeURL,
      alt,
    }));
  };

  onShowModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  render() {
    const { totalHits, images, loading, page, showModal, alt, largeURL } =
      this.state;
    const showBtn =
      images.length !== 0 && page !== Math.ceil(totalHits / 12) && !loading;
    return (
      <div
        className={css.App}
        // ref={this.galleryRef}
      >
        <Searchbar onSubmitForm={this.onSubmitForm}></Searchbar>
        <ImageGallery>
          <ImageGalleryItem
            images={images}
            takeDataImage={this.takeDataImage}
          ></ImageGalleryItem>
        </ImageGallery>
        {loading && <Loader></Loader>}
        {showBtn && <LoadMoreBtn onLoadMore={this.onLoadMore}></LoadMoreBtn>}
        {showModal && (
          <Modal
            imageURL={largeURL}
            tags={alt}
            onClose={this.onShowModal}
          ></Modal>
        )}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    );
  }
}

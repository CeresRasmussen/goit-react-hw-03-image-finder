import React, { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { LoadMoreBtn } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import css from 'components/App.module.css';
import { fetchImages } from '../services/api';

export class App extends Component {
  state = {
    images: [],
    totalHits: null,
    query: '',
    page: 1,
    // status: 'idle',
    loading: false,

    // showModal: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    console.log('componentDidUpdate');
    // this.setState({ status: 'pending' });
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ loading: true });
      const {
        data: { hits, totalHits },
      } = await fetchImages(query, page);

      hits.length
        ? this.setState(prevState => ({
            images: [...prevState.images, ...this.normalaziedImage(hits)],
            totalHits,
            loading: false, // status: 'resolved',
          }))
        : alert("Sorry, we couldn't find anything;( Try another query.");
    }
  }

  normalaziedImage(array) {
    return array.map(({ id, webformatURL, largeImageURL }) => ({
      id,
      webformatURL,
      largeImageURL,
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

  render() {
    const { totalHits, images, loading, page } = this.state;
    console.log('render:');

    return (
      <div className={css.App}>
        <Searchbar onSubmitForm={this.onSubmitForm}></Searchbar>
        <ImageGallery>
          <ImageGalleryItem images={images}></ImageGalleryItem>
        </ImageGallery>
        {images.length !== 0 &&
          (loading ? (
            <Loader></Loader>
          ) : (
            page !== Math.ceil(totalHits / 12) && (
              <LoadMoreBtn onLoadMore={this.onLoadMore}></LoadMoreBtn>
            )
          ))}
      </div>
    );
  }
}

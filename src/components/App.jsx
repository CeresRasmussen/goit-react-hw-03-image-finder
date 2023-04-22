import React, { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from 'components/App.module.css';
import { fetchImages } from '../services/api';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    // showModal: false,
  };

  componentDidMount(e) {
    console.log('componentDidMount');
  }

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    console.log('componentDidUpdate');
    console.log('prevState.query', prevState.query);
    console.log('this.state.query', this.state.query);
    if (prevState.query !== this.state.query) {
      const {
        data: { hits },
      } = await fetchImages(query, page);
      this.setState({
        images: [...prevState.images, ...this.normalaziedImage(hits)],
      });
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

  render() {
    const { page, images } = this.state;
    console.log('images:', images);

    return (
      <div className={css.App}>
        <Searchbar onSubmitForm={this.onSubmitForm}></Searchbar>
        <ImageGallery>
          <ImageGalleryItem images={images}></ImageGalleryItem>
        </ImageGallery>
      </div>
    );
  }
}

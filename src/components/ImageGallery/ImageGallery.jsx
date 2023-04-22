// import React, { Component } from 'react';
import css from 'components/ImageGallery/ImageGallery.module.css';
import { Children } from 'react';

export const ImageGallery = ({ children }) => {
  return <ul className={css.ImageGallery}>{children}</ul>;
};

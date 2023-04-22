import css from 'components/Searchbar/Searchbar.module.css';
import { Formik, Form, Field } from 'formik';
import React from 'react';
import { ReactComponent as SearchIcon } from '../../img/search.svg';

const initialValue = { query: '' };

export const Searchbar = ({ onSubmitForm }) => {
  const onSubmit = ({ query }, { resetForm }) => {
    if (query === '') {
      return alert('Enter a search query');
    }
    onSubmitForm(query);
    resetForm();
  };

  return (
    <header className={css.Searchbar}>
      <Formik initialValues={initialValue} onSubmit={onSubmit}>
        <Form className={css.SearchForm}>
          <button type="submit" className={css['SearchForm-button']}>
            <SearchIcon width={24} height={24}></SearchIcon>
          </button>
          <label htmlFor="query">
            <Field
              id="query"
              className={css['SearchForm-input']}
              type="text"
              name="query"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </label>
        </Form>
      </Formik>
    </header>
  );
};

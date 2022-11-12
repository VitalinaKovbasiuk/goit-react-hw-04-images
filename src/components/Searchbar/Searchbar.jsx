import React from 'react';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'; ///npm i react-icons
import PropTypes from 'prop-types';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormBbutton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [searchData, setSearchData] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(searchData);
  };

  const handleChange = evt => {
    const { value } = evt.target;
    setSearchData(value);
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBbutton type="submit">
          <span>
            <FiSearch size={30} stroke="#9035bd" />
          </span>
          {/* <span className="button-label">Search</span> */}
        </SearchFormBbutton>
        <SearchFormButtonLabel>
          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
          />
        </SearchFormButtonLabel>
      </SearchForm>
    </SearchbarHeader>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

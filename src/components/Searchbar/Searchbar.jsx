import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Search, SearchForm, SearchFormBtn, SearchInput } from './Searchbar.styled';
import { FcSearch } from 'react-icons/fc';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');
  
  const handleSearchChange = e => {
    setSearch(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (search.trim() === '') {
      toast.error('Please enter a search query');
      return;
    }

    onSubmit(search);
    setSearch('');
  };

  return (
    <Search>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <FcSearch size="24" />
        </SearchFormBtn>

        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
          onChange={handleSearchChange}
        />
      </SearchForm>
      <ToastContainer />
    </Search>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
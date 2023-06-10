import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Search, SearchForm, SearchFormBtn, SearchInput } from './Searchbar.styled';
import { FcSearch } from 'react-icons/fc';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Searchbar extends Component {
  state = {
    search: '',
  };

  handleSearchChange = e => {
    this.setState({ search: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.search.trim() === '') {
      toast.error('Please enter a search query');
      return;
    }

    this.props.onSubmit(this.state.search);
    this.setState({ search: '' });
  };

  render() {
    const { search } = this.state;
    return (
      <Search>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormBtn type="submit">
            <FcSearch size="24" />
          </SearchFormBtn>

          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={search}
            onChange={this.handleSearchChange}
          />
        </SearchForm>
        <ToastContainer />
      </Search>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
import React from 'react';
import PropTypes from 'prop-types';
import { BtnLoadMore } from './Button.styled';

const Button = ({ onClick }) => {
  return (
    <BtnLoadMore onClick={onClick}>Load more</BtnLoadMore>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
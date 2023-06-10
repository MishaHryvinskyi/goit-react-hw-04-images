import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { ContainerLoader } from './Loader.styled';

const Loader = () => (
  <ContainerLoader>
    <RotatingLines
      strokeColor="skyblue"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}
    />
  </ContainerLoader>
);

export default Loader;
import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import fetchImages from './API/api';

class App extends Component {
  state = {
    images: [],
    loading: false,
    search: '',
    page: 1,
    showModal: false,
    selectedImage: null,
  };

  handleFormSubmit = search => {
    this.setState({ search, page: 1, images: [], loading: true });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  fetchImages = () => {
    const { search, page, images } = this.state;

    fetchImages(search, page, images)
      .then(updatedState => {
        this.setState(updatedState);
      });
  };

  openModal = image => {
    this.setState({ showModal: true, selectedImage: image });
  };

  closeModal = () => {
    this.setState({ showModal: false, selectedImage: null });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  render() {
    const { images, loading, showModal, selectedImage, showLoadMoreButton } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {loading && <Loader />}
        {images.length > 0 && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}
        {showLoadMoreButton && images.length >= 12 && (
          <Button onClick={this.handleLoadMore} />
        )}
        {showModal && (
          <Modal onClose={this.closeModal}>
            <img src={selectedImage.largeImageURL} alt={selectedImage.tags} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import fetchImages from './API/api';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (search !== '' || page !== 1) {
      setIsFetching(true);
      fetchImages(search, page, images)
        .then(updatedState => {
          setImages(updatedState.images);
          setLoading(false);
          setIsFetching(false);
        })
        .catch(error => {
          console.log('Error fetching data:', error);
          setLoading(false);
          setIsFetching(false);
        });
    }
  }, [search, page]);

  const handleFormSubmit = searchValue => {
    setSearch(searchValue);
    setPage(1);
    setImages([]);
    setLoading(true);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = image => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      {loading && <Loader />}
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {images.length >= 12 && <Button onClick={handleLoadMore} />}
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={selectedImage.largeImageURL} alt={selectedImage.tags} />
        </Modal>
      )}
    </div>
  );
};

export default App;
import fetchImages from './Api/Api';
// import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify'; ///npm i react-toastify
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import { useState, useEffect } from 'react';

export default function App() {
  const [searchData, setSearchData] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!page) {
      // prevPage !== page || prevSearchData !== searchData
      return;
    }
    try {
      setIsLoading(true);
      setShowButton(false);
      const response = fetchImages(searchData, page);
      response.then(data => {
        if (data.data.hits.length === 0) {
          toast.error('Nothing is found ʕ•́ᴥ•̀ʔ');
        }
        setImages(images => [...images, ...data.data.hits]);
        setIsLoading(false);
        setShowButton(
          page < Math.ceil(data.data.totalHits / 12) ? true : false
        );
      });
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, [page, searchData]);

  const onSubmit = newSearchData => {
    if (newSearchData.trim() === '') {
      return toast.error('Enter a word for search ✍(◔◡◔)');
    } else if (newSearchData === searchData) {
      return;
    }
    setSearchData(newSearchData);
    setPage(1);
    setImages([]);
  };

  const nextPage = () => {
    setPage(page => page + 1);
  };

  const openModal = index => {
    setShowModal(true);
    setLargeImage(images[index].largeImageURL);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      {images.length !== 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {showModal && <Modal toggleModal={toggleModal} largeImage={largeImage} />}
      {isLoading && <Loader />}
      <ToastContainer autoClose={2500} />
      {showButton && <Button nextPage={nextPage} />}
    </>
  );
}

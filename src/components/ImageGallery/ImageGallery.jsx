import  { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import { Loader } from '../Loader/Loader';
import { Error } from '../PictureError/ImageError';
import { GalleryApi } from "../../servises/Gallery-api";
import { LoadBtn } from "../LoadMoreBtn/LoadMoreBtn";
import { Modal } from "../Modal/Modal";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";

import { ImageGalleryWrapper, 
         ImageGalleryText } from './ImageGallery.styled';


export const ImageGallery = ({newPictureName}) => {

    const [pictures, setPictures] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState('Idle');
    const [modalPicture, setModalPicture] = useState(null);

    useEffect(() => {
        if (!newPictureName) {
            return;
        };

       setPage(1);
    
    }, [newPictureName]);

    useEffect(() => {

        if (!newPictureName) {
            return;
        };

        setStatus('pending');

        console.log('page', page);

        GalleryApi(newPictureName, page)
        .then(newPictures  => {                
            setPictures(prState => page> 1 ? prState.concat(newPictures) : newPictures);
            setStatus('resolved');
            })
        .catch(error => {
            setError(error)
            setStatus('rejected')
            })
       
        return;

    }, [page]);


    const onLoadMore = () => {
        setStatus('pending');
        setPage(page + 1);
    };

    const toggleModal = (picture) => {
        setShowModal(!showModal);
        setModalPicture(picture);
      };
    
        if(status === 'Idle') {
            return <ImageGalleryText>Please enter a keyword to search a pictures</ImageGalleryText>
        };

        if(status === 'pending') {
            return <Loader />
        };

        if(status === 'rejected') {
            return <Error message={error.message}/>
        };

        if(status === 'resolved') {
            return(
                <>
                    <ImageGalleryWrapper>
                        <ImageGalleryItem pictures={pictures} onClick={toggleModal}/>
                    </ImageGalleryWrapper>

                    <LoadBtn onClick={onLoadMore}/>
                    
                    {showModal && (
                        <Modal onClose={toggleModal}>
                            <img src={modalPicture.largeImageURL} alt={modalPicture.tag} />
                        </Modal>
                    )}
                </>
            );
        }  
};

ImageGallery.propTypes = {
    pictureName: PropTypes.string
};
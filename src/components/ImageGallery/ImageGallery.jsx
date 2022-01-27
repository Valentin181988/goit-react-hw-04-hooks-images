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


export const ImageGallery = ({pictureName}) => {

    const [pictures, setPictures] = useState(null);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState('Idle');
    const [modalPicture, setModalPicture] = useState(null);

    useEffect(() => {  

        if (pictureName) {
            setStatus('pending');
            GalleryApi(pictureName, page)
            .then(pictures  => {
                console.log(pictures);
                
                setPictures(pictures)
                setStatus('resolved');
            })
            .catch(error => {
                setError(error)
                setStatus('rejected')
            })
            console.log(page)
        }
        return;

    }, [pictureName, page]);

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
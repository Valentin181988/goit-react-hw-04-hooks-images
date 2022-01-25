import React, { Component } from "react";
import PropTypes from 'prop-types';

import { Loader } from '../Loader/Loader';
import { Error } from '../PictureError/ImageError';
import { GalleryApi } from "../../servises/Gallery-api";
import { LoadBtn } from "../LoadMoreBtn/LoadMoreBtn";
import { Modal } from "../Modal/Modal";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";

import { ImageGalleryWrapper, 
         ImageGalleryText } from './ImageGallery.styled';


export class ImageGallery extends Component {
    state = {
       pictures: null,
       error: null,
       page: 1,
       showModal: false,
       status: 'Idle',
       modalPicture: null
    };

    componentDidUpdate(prevProps, prevState) {
        const prevName = prevProps.pictureName;
        const nextName = this.props.pictureName;

        if (prevName !== nextName) {

            this.setState({status: 'pending',});

            GalleryApi(nextName, this.state.page)
            .then(pictures  => {
                console.log(pictures)
                this.setState({ pictures, status: 'resolved' })})
            .catch(error => this.setState({ error, status: 'rejected' }))
        };    
    };

    onLoadMore = () => {
        this.setState({status: 'pending',});
        this.setState({page: this.state.page + 1});

        console.log(this.state.page)

        const nextName = this.props.pictureName;

            GalleryApi(nextName, this.state.page + 1)
            .then(nextPictures  => {
                
                const pictures = this.state.pictures.concat(nextPictures)

                console.log(pictures)
                this.setState({ pictures, status: 'resolved' })})
            .catch(error => this.setState({ error, status: 'rejected' }))
    };

    toggleModal = (picture) => {
        this.setState(state => ({ showModal: !state.showModal, modalPicture: picture }));
      };

    render() {
        const { pictures, error, status, showModal, modalPicture } = this.state;
     
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
                        <ImageGalleryItem pictures={pictures} onClick={this.toggleModal}/>
                    </ImageGalleryWrapper>

                    <LoadBtn onClick={this.onLoadMore}/>
                    
                    {showModal && (
                        <Modal onClose={this.toggleModal}>
                            <img src={modalPicture.largeImageURL} alt={modalPicture.tag} />
                        </Modal>
                    )}
                </>
            );
        }  
    };
};

ImageGallery.propTypes = {
    pictureName: PropTypes.string
};
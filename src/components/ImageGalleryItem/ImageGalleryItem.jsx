import { ImageGalleryItems, ImageGalleryItemImg } from "./ImageGalleryItem.styled";
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export const ImageGalleryItem = ({pictures, onClick}) => {
    return(
      <>
        {pictures.map(picture => {
          return(
              <ImageGalleryItems key={nanoid()} onClick={() => onClick(picture)}>
                  <ImageGalleryItemImg src={picture.webformatURL} alt={picture.tag} />
              </ImageGalleryItems>
          );
        })}
      </>
      
    );
};

ImageGalleryItem.propTypes = {
  pictures: PropTypes.array,
  onClick: PropTypes.func
};
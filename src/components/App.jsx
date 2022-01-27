import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export const App = () => {

  const [pictureName, setPictureName] = useState('');
  
  const handleFormSubmit = pictureName => {
    setPictureName(pictureName)
  };
    
    return (
      <div>        
        <Searchbar onSubmit={handleFormSubmit}/>
        <ImageGallery pictureName={pictureName} />
        <Toaster />
      </div>
    );
}

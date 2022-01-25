import { useState } from "react";
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { FcSearch } from "react-icons/fc";

import { SearchBar, 
    SearchForm, 
    SearchInput,
    SearchFormBtn} from './Searchbar.styled';

    
export const Searchbar = ({onSubmit}) => {

    const [pictureName, setPictureName] = useState('');

    const handleInputChange = event => {
        setPictureName(event.currentTarget.value.toLowerCase());
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (pictureName.trim() === '') {
            return toast('Please enter a picture name!')
        };

        onSubmit(pictureName);
        setPictureName('');
    };

        return(
            <SearchBar>
                <SearchForm onSubmit={handleSubmit}>
                    <SearchFormBtn type="submit">
                       <FcSearch size={25}/>
                    </SearchFormBtn>

                    <SearchInput
                        type="text"
                        value={pictureName}
                        onChange={handleInputChange}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </SearchForm>
            </SearchBar>
            
        );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func
};
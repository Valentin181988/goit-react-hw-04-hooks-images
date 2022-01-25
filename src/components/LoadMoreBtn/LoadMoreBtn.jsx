import { LoadMoreBtn } from "./LoadMoreBtn.styled";
import PropTypes from 'prop-types';

export const LoadBtn = ({onClick}) => {
    return(
        <LoadMoreBtn onClick={onClick}>Load more</LoadMoreBtn>
    );
};

LoadBtn.propTypes = {
    onClick: PropTypes.func
};
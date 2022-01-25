import PropTypes from 'prop-types';

export const Error = ({message}) => {
    return(
        <div>
            <p>{message}</p>
        </div>
    );
};

Error.propTypes = {
    message: PropTypes.string
};
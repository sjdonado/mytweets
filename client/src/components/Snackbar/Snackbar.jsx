import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function Snackbar(props) {
  const { open, message } = props;
  const snackbarRef = useRef();

  useEffect(() => {
    if (open) {
      snackbarRef.current.className = 'show';
      setTimeout(() => {
        snackbarRef.current.className = snackbarRef.current.className.replace('show', '');
      }, 3000);
    }
  });

  return (
    <div
      ref={snackbarRef}
      id="snackbar"
    >
      {message}
    </div>
  );
}

Snackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export default Snackbar;

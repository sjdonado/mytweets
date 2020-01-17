import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './Snackbar.scss';

function Snackbar(props) {
  const { open, message, onCompleted } = props;
  const snackbarRef = useRef();

  useEffect(() => {
    if (open) {
      snackbarRef.current.className = 'show';
      setTimeout(() => {
        snackbarRef.current.className = snackbarRef.current.className.replace('show', '');
        onCompleted();
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
  onCompleted: PropTypes.func.isRequired,
};

export default Snackbar;

import React, { useState } from 'react';

import './Login.scss';

import request from '../../services/request';
import { OAUTH_REQUEST_ENDPOINT } from '../../constants';

import Snackbar from '../../components/Snackbar/Snackbar';

function Login() {
  const [snackbarMsg, setSnackbarMsg] = useState('');

  const handleLogin = async () => {
    try {
      const { data } = await request(OAUTH_REQUEST_ENDPOINT);
      window.location.replace(data.url);
    } catch (err) {
      setSnackbarMsg(err.message);
    }
  };

  return (
    <div className="root container">
      <h1 className="title">Welcome to Mytweets app</h1>
      <button
        type="button"
        onClick={handleLogin}
      >
        Login with Twitter
      </button>
      <Snackbar
        open={Boolean(snackbarMsg)}
        message={snackbarMsg}
        onCompleted={() => setSnackbarMsg('')}
      />
    </div>
  );
}


export default Login;

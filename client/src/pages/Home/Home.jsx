import React, { useState, useEffect } from 'react';

import './Home.scss';

import request from '../../services/request';
import {
  CONNECT_ENDPOINT,
  DISCONNECT_ENDPOINT,
  TWEETS_ENDPOINT,
} from '../../constants';

import Snackbar from '../../components/Snackbar/Snackbar';
import Progressbar from '../../components/Progressbar/Progressbar';


function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [tweets, setTweets] = useState();

  const [snackbarMsg, setSnackbarMsg] = useState('');

  const fetchTweets = async () => {
    setIsLoading(true);
    try {
      const { data } = await request(TWEETS_ENDPOINT);
      setTweets(data);
    } catch (err) {
      setSnackbarMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshTweets = async () => {
    try {
      await fetchTweets();
      setSnackbarMsg('Last tweets fetched successfully');
    } catch (err) {
      setSnackbarMsg(err.message);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await request(DISCONNECT_ENDPOINT, 'POST');
      window.location.reload();
    } catch (err) {
      setSnackbarMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsLoading(true);
      try {
        const { data } = await request(CONNECT_ENDPOINT, 'POST');
        setUserInfo(data);
        await fetchTweets();
      } catch (err) {
        window.location.replace('/login');
      } finally {
        setIsLoading(false);
      }
    };

    if (document.cookie.includes('connect.sid')) {
      fetchUserInfo();
    } else {
      window.location.replace('/login');
    }
  }, []);

  return (
    <>
      {isLoading && <Progressbar />}
      {userInfo && (
        <>
          <div className="user-container">
            <div className="cover">
              <img
                src={userInfo.banner}
                alt="User profile banner"
              />
            </div>
            <div className="header">
              <img
                className="avatar"
                src={userInfo.avatar}
                alt="User profile"
              />
              <div className="vertical-wrapper">
                <h1>{userInfo.name}</h1>
                <span className="screen-name">{`@${userInfo.screenName}`}</span>
                <span>{userInfo.description}</span>
                <span>{userInfo.location}</span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
          <div className="tweets-container">
            <div className="header">
              <h4>My tweets</h4>
              <button
                type="button"
                onClick={handleRefreshTweets}
                disabled={isLoading}
              >
                Refresh
              </button>
            </div>
            {tweets && (tweets.map((tweet) => (
              <div
                key={tweet.id}
                className="card"
              >
                <img
                  className="avatar"
                  src={tweet.user.profile_image_url_https}
                  alt="User profile"
                />
                <div className="vertical-wrapper">
                  <div className="tweet-header">
                    <span className="author">{tweet.user.name}</span>
                    <span>{`@${tweet.user.screen_name}`}</span>
                    <span>{new Date(tweet.created_at).toLocaleDateString()}</span>
                  </div>
                  <span>{tweet.text}</span>
                </div>
              </div>
            )))}
          </div>
        </>
      )}
      <Snackbar
        open={Boolean(snackbarMsg)}
        message={snackbarMsg}
        onCompleted={() => setSnackbarMsg('')}
      />
    </>
  );
}

export default Home;

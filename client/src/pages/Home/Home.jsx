import React, { useState, useEffect } from 'react';

import './Home.scss';

import request from '../../services/request';
import { CONNECT_ENDPOINT, DISCONNECT_ENDPOINT } from '../../constants';

function Home() {
  const [userInfo, setUserInfo] = useState();

  const fetchUserInfo = async () => {
    try {
      const { data } = await request(CONNECT_ENDPOINT, 'POST');
      console.log('data', data);
      setUserInfo(data);
    } catch (err) {
      window.location.replace('/login');
    }
  };

  const handleLogout = async () => {
    try {
      const { data } = await request(DISCONNECT_ENDPOINT, 'POST');
      console.log('data', data);
      window.location.reload();
    } catch (err) {
      console.log('err', err);
      // window.location.replace('/login');
    }
  };

  useEffect(() => {
    if (!userInfo) {
      fetchUserInfo();
    }
  }, [userInfo]);

  return (
    <>
      {userInfo && (
        <>
          <div className="user-container">
            <div className="cover">
              <img
                src={userInfo.profile_banner_url}
                alt="User profile banner"
              />
            </div>
            <div className="header">
              <img
                className="avatar"
                src={userInfo.profile_image_url_https}
                alt="User profile"
              />
              <div className="vertical-wrapper">
                <h1>{userInfo.name}</h1>
                <span className="screen-name">{userInfo.screen_name}</span>
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
          {/* <h4>Most 100 recent tweets</h4> */}
        </>
      )}
    </>
  );
}

export default Home;

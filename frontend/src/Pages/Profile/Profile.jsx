import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header'
import ShortUrlCard from '../../components/ShortUrlCard/ShortUrlCard';
import QRCodeCard from '../../components/QRCodeCard/QRCodeCard';
import './Profile.css'
import { useSelector,useDispatch } from 'react-redux';
import { fetchUrls } from '../../Redux/urlSlice';
import { userDeatils } from '../../Redux/authSlice';

const Profile = () => {

  const {urls,qrCodes} = useSelector((state) => state.url)
  const dispatch = useDispatch();
  const { username, email } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(fetchUrls())
    if (!username) {
      dispatch(userDeatils());
    }
  },[dispatch,username])

  return (
    <div>
      <Header />
      <main className="hero-gradient">
        <div className="container py-5">
          <div className="profile-header text-center mb-4">
            <h1 className="h3 mb-2">{username}</h1>
            <p className="text-white-50">{email}</p>
          </div>

          <div className="row">
          <div className="col-lg-4 mb-4">
            {qrCodes.map((qrCode, index) => (
              <QRCodeCard 
                qrCodeUrl={qrCode}
              />
            ))}
          </div>
            
            <div className="col-lg-8">
              {urls.map(url => (
                <ShortUrlCard 
                  key={url.id}
                  shortenedUrl={`http://localhost:5173/${url.short_url}`}
                  originalUrl={url.original_url}
                  status={url.status}
                  createdOn={url.created}
                  totalClicks={url.clicks}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-4">
            <button className="btn btn-primary">
              <i className="bi bi-plus-lg me-2"></i>Create New Short URL
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
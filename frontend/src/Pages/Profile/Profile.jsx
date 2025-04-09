import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header'
import ShortUrlCard from '../../components/ShortUrlCard/ShortUrlCard';
import QRCodeCard from '../../components/QRCodeCard/QRCodeCard';
import './Profile.css'
import { useSelector, useDispatch } from 'react-redux';
import { fetchUrls } from '../../Redux/urlSlice';
import { userDeatils } from '../../Redux/authSlice';
import Loading from '../../components/Loading/Loading';

const Profile = () => {
  const dispatch = useDispatch();
  const { urls, qrCodes } = useSelector((state) => state.url);
  const { username, email } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(fetchUrls()),
          dispatch(userDeatils())
        ]);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Loading loading={isLoading}>
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
                    key={index}
                    qrCodeUrl={qrCode}
                  />
                ))}
              </div>
              
              <div className="col-lg-8">
                {urls.map(url => (
                  <ShortUrlCard 
                    key={url.id}
                    shortenedUrl={`https://shortik-seven.vercel.app/${url.short_url}`}
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
      </Loading>
    </div>
  );
};

export default Profile;
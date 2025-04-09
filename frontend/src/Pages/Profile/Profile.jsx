import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import ShortUrlCard from '../../components/ShortUrlCard/ShortUrlCard';
import QRCodeCard from '../../components/QRCodeCard/QRCodeCard';
import './Profile.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUrls } from '../../Redux/urlSlice';
import { userDetails } from '../../Redux/authSlice';
import { Link } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const { urls, qrCodes, status: urlStatus } = useSelector((state) => state.url);
  const { username, email, status: authStatus } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fix the typo in function name (userDeatils -> userDetails)
        await Promise.all([
          dispatch(fetchUrls()),
          dispatch(userDetails())
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // Set loading to false after API calls complete (success or error)
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  // Determine if we're still loading data
  const isDataLoading = isLoading || authStatus === 'loading' || urlStatus === 'loading';

  // Placeholder counts when data is loading
  const urlCount = urls?.length || 0;
  const qrCount = qrCodes?.length || 0;

  return (
    <div className="profile-page">
      <Header />
      
      <main className="hero-gradient">
        <div className="container py-5">
          {isDataLoading ? (
            // Loading state
            <div className="loading-container text-center py-5">
              <div className="spinner-container mb-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
              <h3 className="loading-text">Loading your profile...</h3>
            </div>
          ) : (
            <>
              {/* Profile Header with Animation */}
              <div className="profile-header text-center mb-5 animate-in">
                <div className="profile-avatar mb-3">
                  <div className="avatar-placeholder">
                    {username ? username.charAt(0).toUpperCase() : '?'}
                  </div>
                </div>
                <h1 className="h3 mb-2">{username || 'User'}</h1>
                <p className="text-secondary mb-4">{email || 'Loading email...'}</p>
                
                {/* Stats Summary */}
                <div className="row justify-content-center">
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="stats-card mb-3">
                      <h3 className="h4 mb-0">{urlCount}</h3>
                      <p className="text-secondary mb-0">Short URLs</p>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="stats-card mb-3">
                      <h3 className="h4 mb-0">{qrCount}</h3>
                      <p className="text-secondary mb-0">QR Codes</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="row gx-4 gy-4">
                {/* URLs Section */}
                <div className="col-lg-8 order-lg-1 order-2 animate-in" style={{ animationDelay: '0.2s' }}>
                  <div className="section-header d-flex justify-content-between align-items-center mb-3">
                    <h2 className="h4 mb-0">Your Short URLs</h2>
                    <Link to="/create" className="btn btn-primary btn-sm">
                      <i className="bi bi-plus-lg me-1"></i>Create New
                    </Link>
                  </div>
                  
                  {urls && urls.length > 0 ? (
                    urls.map((url, index) => (
                      <ShortUrlCard 
                        key={url.id || index}
                        shortenedUrl={`https://shortik-seven.vercel.app/${url.short_url}`}
                        originalUrl={url.original_url}
                        status={url.status}
                        createdOn={url.created}
                        totalClicks={url.clicks}
                      />
                    ))
                  ) : (
                    <div className="empty-state p-4 text-center">
                      <i className="bi bi-link-slash display-4 text-secondary mb-3"></i>
                      <h3 className="h5">No URLs yet</h3>
                      <p className="text-secondary mb-3">You haven't created any short URLs yet.</p>
                      <Link to="/create" className="btn btn-primary">
                        Create Your First URL
                      </Link>
                    </div>
                  )}
                </div>
                
                {/* QR Codes Section */}
                <div className="col-lg-4 order-lg-2 order-1 animate-in" style={{ animationDelay: '0.1s' }}>
                  <div className="section-header d-flex justify-content-between align-items-center mb-3">
                    <h2 className="h4 mb-0">Your QR Codes</h2>
                  </div>
                  
                  {qrCodes && qrCodes.length > 0 ? (
                    qrCodes.map((qrCode, index) => (
                      <QRCodeCard 
                        key={index}
                        qrCodeUrl={qrCode}
                      />
                    ))
                  ) : (
                    <div className="empty-state p-4 text-center">
                      <i className="bi bi-qr-code display-4 text-secondary mb-3"></i>
                      <h3 className="h5">No QR Codes</h3>
                      <p className="text-secondary mb-3">Your QR codes will appear here.</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
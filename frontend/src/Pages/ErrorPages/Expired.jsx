import React from 'react';
import './Expired.css'

const ExpiredUrlPage = () => {
  return (
    <div className="expired-url-container">
      <div className="expired-url-card">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="expired-url-icon" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        <h1 className="expired-url-title">
          Short URL Expired
        </h1>
        <p className="expired-url-message">
          The short URL you're trying to access has expired or is no longer available. 
          This could happen if the link was deleted or has reached its expiration time.
        </p>
        <div className="expired-url-actions">
          <a 
            href="/" 
            className="expired-url-btn"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default ExpiredUrlPage;
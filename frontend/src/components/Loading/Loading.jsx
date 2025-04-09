import React from 'react';
import './Loading.css';

const Loading = ({ loading, children }) => {
  if (!loading) return children;

  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loading;
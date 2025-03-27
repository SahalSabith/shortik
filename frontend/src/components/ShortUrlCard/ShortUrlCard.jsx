import React, { useEffect } from 'react';
import { Info } from 'lucide-react';

const ShortUrlCard = ({ 
  shortenedUrl = 'http://127.0.0.1:8000/example-short-url', 
  originalUrl = 'https://your-very-long-original-url.com/with/lots/of/parameters',
  totalClicks = null,
  createdOn = null,
  status = null
}) => {
  
  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(tooltip => new window.bootstrap.Tooltip(tooltip));
  }, []);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shortenedUrl);
  };

  return (
    <div className="url-card">
      <div className="success-badge mb-3 d-flex justify-content-between align-items-center">
        <div>
          <i className="bi bi-check-circle me-2 animated-checkmark"></i>
          URL Successfully Shortened
        </div>
        <button
          className="btn btn-sm btn-outline-secondary rounded-circle p-0 d-flex align-items-center justify-content-center"
          style={{ width: '30px', height: '30px' }}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="This shortened URL will be automatically removed 2 days after expiration."
        >
          <Info size={16} />
        </button>
      </div>

      <div className="url-display mb-3">
        <div className="d-flex align-items-center mb-2">
          <input 
            type="text" 
            className="form-control form-control-sm me-2" 
            value={shortenedUrl} 
            readOnly 
          />
          <button 
            className="btn btn-primary btn-sm px-3"
            onClick={handleCopyUrl}
          >
            <i className="bi bi-clipboard me-2"></i>Copy
          </button>
        </div>
        <a 
          href={originalUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="original-url text-truncate"
          title={originalUrl}
        >
          <i className="bi bi-link-45deg me-2"></i>
          {originalUrl}
        </a>
      </div>

      <div className="row g-3">
        <div className="col-4">
          <div className="small-stats-card">
            <h3 className="h6 text-muted mb-1">Clicks</h3>
            <p className="h5 mb-0">{totalClicks}</p>
          </div>
        </div>
        <div className="col-4">
          <div className="small-stats-card">
            <h3 className="h6 text-muted mb-1">Created</h3>
            <p className="h5 mb-0">
              {new Date(createdOn).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
        </div>
        <div className="col-4">
          <div className="small-stats-card">
            <h3 className="h6 text-muted mb-1">Status</h3>
            {status ? (
              <p className="h5 mb-0 text-success">Active</p>
            ) : (
              <p className="h5 mb-0 text-danger">Expired</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortUrlCard;

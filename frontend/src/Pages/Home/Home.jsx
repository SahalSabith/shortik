import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import './Home.css';
import { qrGenerator, urlShort } from '../../Redux/urlSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [activeTab, setActiveTab] = useState('shorten');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  const navigate = useNavigate()

  const dispatch = useDispatch();

  const qrCode = useSelector((state) => state.url.qrCode);
  const short_url = useSelector((state) => state.url.short_url);
  const urlStatus = useSelector((state) => state.url.status);
  const urlError = useSelector((state) => state.url.error);

  const urlPattern = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

  useEffect(() => {   
    if (qrCode) {
      setQrCodeUrl(`https://shortik.onrender.com${qrCode}`);
      setIsLoading(false);
    }
    if (short_url) {
      setShortenedUrl(`https://shortik-seven.vercel.app/${short_url}`);
      setIsLoading(false);
    }
  }, [qrCode, short_url]);

  useEffect(() => {
    setIsLoading(urlStatus === 'loading');
  }, [urlStatus]);

  const handleSubmit = (e, type) => {
    e.preventDefault();
    
    const currentUrl = type === 'shorten' ? url : qrUrl;
    if (!urlPattern.test(currentUrl)) {
      alert('Please enter a valid URL');
      return;
    }

    setIsLoading(true);
    
    if (type === 'shorten') {
      if (localStorage.getItem('token')) {
        dispatch(urlShort(currentUrl));
      } else {
        navigate('/login')
      }
    } else if (type === 'qr') {
      if (localStorage.getItem('token')) {
        dispatch(qrGenerator(currentUrl));
      } else {
        navigate('/login')
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setShowCopyTooltip(true);
    setTimeout(() => setShowCopyTooltip(false), 2000);
  };

  const downloadQRCode = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      
      link.download = `qr-code-${new Date().getTime()}.png`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsLoading(false);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download QR code');
      setIsLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Header />
      <main className="hero-gradient">
        <section className="hero-section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <span className="badge bg-primary bg-opacity-10 text-primary mb-3 px-3 py-2 rounded-pill">
                  Simplify Your Links
                </span>
                <h1 className="display-4 fw-bold mb-4">
                  Transform Long URLs into <span className="text-primary">Memorable Links</span>
                </h1>
                <p className="lead text-muted mb-5">
                  Create short links and QR codes instantly. Perfect for social media, 
                  marketing campaigns, or sharing across any platform.
                </p>
              </div>
              <div className="col-lg-6">
                <div className="tool-card p-4">
                  <ul className="nav nav-pills nav-fill mb-4" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button 
                        className={`nav-link ${activeTab === 'shorten' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('shorten')}
                      >
                        <i className="bi bi-link-45deg me-2"></i>Shorten URL
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button 
                        className={`nav-link ${activeTab === 'qr' ? 'active' : ''}`}
                        onClick={() => setActiveTab('qr')}
                      >
                        <i className="bi bi-qr-code me-2"></i>Generate QR
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content">
                    {activeTab === 'shorten' && (
                      <div className="tab-pane fade show active">
                        <form 
                          id="shortenForm" 
                          onSubmit={(e) => handleSubmit(e, 'shorten')} 
                          className="url-form"
                        >
                          <div className="mb-3">
                            <input 
                              type="url" 
                              name="url" 
                              value={url}
                              onChange={(e) => setUrl(e.target.value)}
                              className="form-control" 
                              placeholder="Paste your long URL here..." 
                              required 
                              disabled={isLoading}
                            />
                          </div>
                          <button 
                            type="submit" 
                            className={`btn btn-primary w-100 ${isLoading ? 'btn-loading' : ''}`}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Processing...
                              </>
                            ) : (
                              <>
                                Create Short Link
                                <i className="bi bi-arrow-right ms-2"></i>
                              </>
                            )}
                          </button>

                          {urlStatus === 'failed' && (
                            <div className="alert alert-danger mt-3" role="alert">
                              {urlError || 'URL shortening failed'}
                            </div>
                          )}

                          {shortenedUrl && (
                            <div className="result-card mt-3">
                              <p className="result-label mb-2">Your shortened URL:</p>
                              <div className="d-flex justify-content-between align-items-center position-relative">
                                <input 
                                  type="text" 
                                  value={shortenedUrl} 
                                  className="form-control me-2" 
                                  readOnly 
                                />
                                <div className="copy-btn-wrapper">
                                  <i 
                                    className="bi bi-clipboard copy-btn fs-5" 
                                    title="Copy to clipboard"
                                    onClick={copyToClipboard}
                                  ></i>
                                  {showCopyTooltip && (
                                    <span className="copy-tooltip">Copied!</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </form>
                      </div>
                    )}

                    {activeTab === 'qr' && (
                      <div className="tab-pane fade show active">
                        <form 
                          id="qrForm" 
                          onSubmit={(e) => handleSubmit(e, 'qr')} 
                          className="url-form"
                        >
                          <div className="mb-3">
                            <input 
                              type="url" 
                              name="url" 
                              className="form-control" 
                              placeholder="Enter URL for QR code..." 
                              value={qrUrl}
                              onChange={(e) => setQrUrl(e.target.value)}
                              required 
                              disabled={isLoading}
                            />
                          </div>
                          <button 
                            type="submit" 
                            className={`btn btn-primary w-100 ${isLoading ? 'btn-loading' : ''}`}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Generating...
                              </>
                            ) : (
                              <>
                                Generate QR Code
                                <i className="bi bi-arrow-right ms-2"></i>
                              </>
                            )}
                          </button>

                          {urlStatus === 'failed' && (
                            <div className="alert alert-danger mt-3" role="alert">
                              {urlError || 'QR Code generation failed'}
                            </div>
                          )}

                          {qrCodeUrl && (
                            <div className="result-card text-center mt-3">
                              <p className="result-label mb-2">Your QR Code:</p>
                              <div className="qr-preview mx-auto">
                                {isLoading ? (
                                  <div className="qr-loading-placeholder">
                                    <div className="spinner-border text-primary" role="status">
                                      <span className="visually-hidden">Loading...</span>
                                    </div>
                                  </div>
                                ) : (
                                  <img 
                                    src={qrCodeUrl} 
                                    alt="QR Code" 
                                    className="img-fluid" 
                                  />
                                )}
                              </div>
                              <button 
                                className={`btn btn-outline-primary mt-3 ${isLoading ? 'btn-loading' : ''}`}
                                onClick={downloadQRCode}
                                disabled={isLoading}
                              >
                                {isLoading ? (
                                  <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Downloading...
                                  </>
                                ) : (
                                  <>
                                    <i className="bi bi-download me-2"></i>Download QR Code
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
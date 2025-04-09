import React, { useEffect } from 'react';
import { Download, Info } from 'lucide-react';

const QRCodeCard = ({ qrCodeUrl = "/api/placeholder/200/200" }) => {
  useEffect(() => {
    // Initialize Bootstrap tooltip
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new window.bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, []);

  const downloadQRCode = async () => {
    try {
      const response = await fetch(`https://shortik.onrender.com${qrCodeUrl}`);
      const blob = await response.blob();
      
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `qr-code-${new Date().getTime()}.png`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download QR code');
    }
  };

  return (
    <div className="card border-0 shadow-sm mb-3">
      <div className="card-body p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="card-title mb-0 text-muted">QR Code</h6>
          <button
            className="btn btn-sm btn-outline-secondary rounded-circle p-0 d-flex align-items-center justify-content-center"
            style={{ width: '30px', height: '30px' }}
            title="Download the QR code. After 2 hours, it will automatically delete."
            data-bs-toggle="tooltip"
            data-bs-title="Download the QR code. After 2 hours, it will automatically delete."
          >
            <Info size={16} />
          </button>
        </div>

        <div className="text-center mb-3">
          <img
            src={`https://shortik.onrender.com${qrCodeUrl}`}
            alt="QR Code"
            className="img-fluid rounded shadow-sm"
            style={{ maxWidth: '200px' }}
          />
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-primary btn-sm" onClick={downloadQRCode}>
            <Download size={16} className="me-2" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeCard;
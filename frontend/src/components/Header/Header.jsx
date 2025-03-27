import React, { useState, useEffect, useRef } from 'react'
import { logout } from '../../Redux/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Header.css'

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { status, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  }

  const handleProfileClick = () => {
    navigate('/profile');
    setIsDropdownOpen(false);
  }

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent event from propagating
    setIsDropdownOpen(!isDropdownOpen);
  }

  // Effect to handle clicking outside of dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <i className="bi bi-link-45deg text-primary fs-3"></i>
          <span className="ms-2 fw-bold">Shortik</span>
        </a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="https://github.com/SahalSabith/shortik" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <i className="bi bi-github"></i>
              </a>
            </li>

            <li className="nav-item dropdown position-relative" ref={dropdownRef}>
              <button 
                className="btn btn-user-dropdown" 
                onClick={toggleDropdown}
              >
                <i className="bi bi-person-circle"></i>
              </button>
              {isDropdownOpen && (
                <div className="dropdown-menu show">
                  <button 
                    className="dropdown-item" 
                    onClick={handleProfileClick}
                  >
                    <i className="bi bi-person me-2"></i>Profile
                  </button>
                  <button 
                    className="dropdown-item" 
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>Logout
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
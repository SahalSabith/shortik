import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { register } from '../../../Redux/authSlice';
import { useNavigate } from 'react-router-dom';

function Register() {

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));

    // Clear password error when typing
    if (id === 'confirmPassword' || id === 'password') {
      setPasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    dispatch(register(formData));
    console.log('Registration submitted', formData);
    navigate('/')
  };

  return (
    <div className="auth-page hero-gradient">
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="tool-card p-5 text-center">
              <div className="mb-4 d-flex justify-content-center align-items-center">
                <i className="bi bi-link-45deg text-primary fs-3 me-2"></i>
                <h2 className="brand-text mb-0 fw-bold">Shortik</h2>
              </div>
              <h4 className="mb-4 text-muted">Create Account</h4>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input 
                    type="text" 
                    id="username" 
                    className="form-control" 
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="mb-4">
                  <input 
                    type="email" 
                    id="email" 
                    className="form-control" 
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="mb-4">
                  <input 
                    type="password" 
                    id="password" 
                    className="form-control" 
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="mb-4">
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    className="form-control" 
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required 
                  />
                  {passwordError && (
                    <div className="text-danger small mt-2">
                      {passwordError}
                    </div>
                  )}
                </div>

                <button 
                  className="btn btn-primary btn-lg w-100 mb-4" 
                  type="submit"
                >
                  Sign Up
                </button>

                <p className="mb-0">
                  Already have an account? {' '}
                  <Link to="/login" className="text-primary fw-bold">
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
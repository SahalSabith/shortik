import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { register } from '../../../Redux/authSlice';

function Register() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  // Reset navigation after successful registration
  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/');
    }
  }, [status, navigate]);

  const validateForm = () => {
    let isValid = true;
    const errors = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    // Username validation
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
      isValid = false;
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
        isValid = false;
      }
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));

    // Clear the specific error when user starts typing
    if (formErrors[id]) {
      setFormErrors({
        ...formErrors,
        [id]: ''
      });
    }
    
    // Clear API error when user modifies form
    if (apiError) {
      setApiError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous API error
    setApiError('');
    
    if (validateForm()) {
      setIsLoading(true);
      
      try {
        // Create a copy without confirmPassword as backend doesn't need it
        const registerData = {
          username: formData.username,
          email: formData.email,
          password: formData.password
        };
        
        const resultAction = await dispatch(register(registerData));
        
        if (register.fulfilled.match(resultAction)) {
          // Success - navigation handled by useEffect
        } else if (register.rejected.match(resultAction)) {
          // Handle specific API errors
          const errorData = resultAction.payload;
          if (typeof errorData === 'object') {
            // Format error messages from API
            const errorMessages = Object.entries(errorData)
              .map(([key, value]) => {
                // Handle array of errors
                if (Array.isArray(value)) {
                  return `${key}: ${value.join(', ')}`;
                }
                return `${key}: ${value}`;
              })
              .join('. ');
            setApiError(errorMessages);
          } else {
            setApiError(errorData || 'Registration failed. Please try again.');
          }
        }
      } catch (err) {
        setApiError('An unexpected error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
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
              
              {/* API Error Alert */}
              {apiError && (
                <div className="alert alert-danger mb-4" role="alert">
                  {apiError}
                </div>
              )}
              
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-4">
                  <div className="form-floating">
                    <input 
                      type="text" 
                      id="username" 
                      className={`form-control ${formErrors.username ? 'is-invalid' : ''}`}
                      placeholder="Choose a username"
                      value={formData.username}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    <label htmlFor="username">Username</label>
                    {formErrors.username && (
                      <div className="invalid-feedback text-start">{formErrors.username}</div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="form-floating">
                    <input 
                      type="email" 
                      id="email" 
                      className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    <label htmlFor="email">Email</label>
                    {formErrors.email && (
                      <div className="invalid-feedback text-start">{formErrors.email}</div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="form-floating">
                    <input 
                      type="password" 
                      id="password" 
                      className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    <label htmlFor="password">Password</label>
                    {formErrors.password && (
                      <div className="invalid-feedback text-start">{formErrors.password}</div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="form-floating">
                    <input 
                      type="password" 
                      id="confirmPassword" 
                      className={`form-control ${formErrors.confirmPassword ? 'is-invalid' : ''}`}
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    {formErrors.confirmPassword && (
                      <div className="invalid-feedback text-start">{formErrors.confirmPassword}</div>
                    )}
                  </div>
                </div>

                <button 
                  className="btn btn-primary btn-lg w-100 mb-4" 
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Creating Account...
                    </>
                  ) : (
                    'Sign Up'
                  )}
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
  );
}

export default Register;
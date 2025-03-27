import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../../Redux/authSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData))
    navigate('/')
    console.log('Login submitted', formData);
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
              <h4 className="mb-4 text-muted">Sign In</h4>

              {/* Form Start */}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="username"
                    id="username"
                    className="form-control"
                    placeholder="Enter your Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button className="btn btn-primary btn-lg w-100 mb-4" type="submit">
                  Sign In
                </button>

                <p className="mb-0">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary fw-bold">
                    Sign Up
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

export default Login;
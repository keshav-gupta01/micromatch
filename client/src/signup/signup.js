import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { useEffect } from 'react';



const additionalStyles = `
  
`;

const SignupPage = () => {
  useEffect(() => {
    document.title = "Sign Up - MicroMatch";
  }, []);


  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
        <video src={`${process.env.PUBLIC_URL}/video.mp4`} loop autoPlay muted />
      <style>{additionalStyles}</style>
      <div className="signup-container">
        <div className="signup-card">
          {isSubmitted ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h2 className="card-title">Sign Up Successful!</h2>
              <p className="card-text">Your account has been created successfully.</p>
              <button className="btn" onClick={() => window.location.href = '#'}>
                Continue to Dashboard
              </button>
            </div>
          ) : (
            <>
              <div className="signup-header">
                <h2>Create Account</h2>
              </div>
              <div className="signup-form">
                <form onSubmit={handleSubmit}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="signup-input"
                      name="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                    {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                  </div>
                  
                  <div className="input-group">
                    <input
                      type="email"
                      className="signup-input"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>
                  
                  <div className="input-group">
                    <input
                      type="password"
                      className="signup-input"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && <span className="error-text">{errors.password}</span>}
                  </div>
                  
                  <div className="input-group">
                    <input
                      type="password"
                      className="signup-input"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                  </div>
                  
                  <button type="submit" className="signup-button">
                    Sign Up
                  </button>
                </form>
                
                <div className="login-link">
                  Already have an account? <Link to="/login">Log In</Link>
                </div>

              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SignupPage;
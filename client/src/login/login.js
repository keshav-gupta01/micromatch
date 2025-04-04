import React, { useState } from 'react';

const additionalStyles = `
`;

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length === 0) {
      console.log('Login submitted:', formData);
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
              <h2 className="card-title">Login Successful!</h2>
              <p className="card-text">Redirecting to your dashboard...</p>
              <button className="btn" onClick={() => window.location.href = '#'}>
                Continue
              </button>
            </div>
          ) : (
            <>
              <div className="signup-header">
                <h2>Welcome Back!</h2>
                <p>Please log in to your account</p>
              </div>
              <div className="signup-form">
                <form onSubmit={handleSubmit}>
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
                  
                  <button type="submit" className="signup-button">
                    Log In
                  </button>
                </form>
                
                <div className="login-link">
                  Don't have an account? <a href="/signup">Sign Up</a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;

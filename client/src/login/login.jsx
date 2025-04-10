import React, { useState, useEffect } from 'react';
import './login.css';





const additionalStyles = `
`;

const LoginPage = () => {
  useEffect(() => {
    document.title = "Login - MicroMatch";
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok && data.token) {
          console.log('Login successful:', data);
          setIsSubmitted(true);
          // localStorage.setItem('token', data.token);
        } else {
          setErrors({ server: data.message || 'Login failed' });
        }
      } catch (error) {
        console.error('Login error:', error);
        setErrors({ server: 'Something went wrong. Please try again.' });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-inner animate-slide-in">
      <img src="logo.svg" alt="Logo" className="logo" />
        {isSubmitted ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2 className="card-title">Login Successful!</h2>
            <p className="card-text">Redirecting to your dashboard...</p>
            <button className="signup-button" onClick={() => window.location.href = "/dashboard"}>
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
              <form onSubmit={handleSubmit} className="form">
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

                {errors.server && <span className="error-text">{errors.server}</span>}

                <button type="submit" className="signup-button">
                  Log In
                </button>
              </form>

              <div className="login-link">
                Don&apos;t have an account? <a href="/signup">Sign Up</a>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="signup-illustration">
          <div className="monitor-wrapper">
            <img src="monitor.svg" alt="monitor" className="monitor" />
            <img src="dash.svg" alt="dash" className="monitor-icons dash" />
            <img src="miota.svg" alt="iota" className="monitor-icons iota" />
            <img src="eth.svg" alt="eth" className="monitor-icons eth" />
          </div>
        </div>
    </div>
  );

};

export default LoginPage;

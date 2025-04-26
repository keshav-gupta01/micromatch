import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./InfluencerSignIn.css";

const InfluencerSignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    category: "",
    instagramUsername: "",
  });

  const [errors, setErrors] = useState({});
  const [allowPermission, setAllowPermission] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [instagramId, setInstagramId] = useState("");

  useEffect(() => {
    // Load saved form data (if any) when page loads
    const savedFormData = localStorage.getItem('influencerFormData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }

    // Check if Instagram returned a code
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');

    console.log("Instagram Code from URL:", code); // Log the code from URL

    if (code) {
      axios.get(`https://micromatch-backend.onrender.com/api/influencers/verify-instagram?code=${code}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      })
      .then(res => {
        console.log("Instagram Verification Response:", res); // Log the response

        if (res.data.success) {
          setAllowPermission(true);
          setAccessToken(res.data.access_token);
          setInstagramId(res.data.insta_scoped_id);
          alert("✅ Instagram verified successfully");
        } else {
          alert("Instagram verification failed. Please try again.");
        }
      })
      .catch(err => {
        console.error("Error verifying Instagram:", err); // Log the error
        alert("Error connecting Instagram. Please try again.");
      });
    }
  }, []);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) tempErrors.email = "Email is required";
    if (!formData.password.trim()) tempErrors.password = "Password is required";
    if (!formData.category.trim()) tempErrors.category = "Category is required";
    if (!formData.instagramUsername.trim()) tempErrors.instagramUsername = "Instagram username is required";
    if (!allowPermission) tempErrors.permission = "Please connect Instagram first.";

    setErrors(tempErrors);
    console.log("Validation Errors:", tempErrors); // Log the errors

    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // Save updated form data to localStorage
    localStorage.setItem('influencerFormData', JSON.stringify(updatedFormData));
    console.log("Updated Form Data:", updatedFormData); // Log the updated form data
  };

  const handleInstagramAuth = () => {
    console.log("Redirecting to Instagram for authentication...");
    window.location.href = `https://api.instagram.com/oauth/authorize?client_id=847228190287555&redirect_uri=https://micromatch-frontend.onrender.com/influencer-signin&scope=user_profile,user_media&response_type=code`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted, Validating...");

    if (validate()) {
      console.log("Validation Passed, Submitting Form...");

      try {
        const res = await axios.post("https://micromatch-backend.onrender.com/api/influencers/register", {
          ...formData,
          access_token: accessToken,
          insta_scoped_id: instagramId,
        });

        console.log("Sign-Up Response:", res); // Log the response

        if (res.data.success) {
          alert("✅ Signup successful!");
          // Clear localStorage saved form data
          localStorage.removeItem('influencerFormData');
          navigate("/login");
        } else {
          alert("Signup failed. Please try again.");
        }
      } catch (err) {
        console.error("Signup error:", err); // Log the error
        alert("Signup error. Please try again later.");
      }
    } else {
      console.log("Validation Failed");
      alert("❌ Please fix the form errors before submitting.");
    }
  };

  return (
    <div className="influencer-signin-container">
      <h2>Influencer Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />
        {errors.category && <span className="error">{errors.category}</span>}

        <input
          type="text"
          name="instagramUsername"
          placeholder="Instagram Username"
          value={formData.instagramUsername}
          onChange={handleChange}
        />
        {errors.instagramUsername && <span className="error">{errors.instagramUsername}</span>}

        <button
          type="button"
          className={`connect-button ${allowPermission ? "connected" : ""}`}
          onClick={handleInstagramAuth}
        >
          {allowPermission ? "Connected ✅" : "Connect with Instagram"}
        </button>
        {errors.permission && <span className="error">{errors.permission}</span>}

        <button
          type="submit"
          className={`signup-button ${allowPermission ? "" : "disabled"}`}
          disabled={!allowPermission}
        >
          Sign Up
        </button>
      </form>

      <p>Already have an account? <Link to="/influencer-login">Login</Link></p>
    </div>
  );
};

export default InfluencerSignIn;

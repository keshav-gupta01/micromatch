import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./InfluencerSignIn.css";

const InfluencerSignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    gmail: "", // Changed from email to gmail to match backend
    password: "",
    category: "",
    instaId: "", // Changed from instagramUsername to instaId to match backend
    contactNo: "", // Added as expected by backend
    pincode: "", // Added as expected by backend
    youtubeChannel: "" // Added as expected by backend
  });

  const [errors, setErrors] = useState({});
  const [allowPermission, setAllowPermission] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [instagramId, setInstagramId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      // Load saved form data (if any) when page loads
      const savedFormData = localStorage.getItem('influencerFormData');
      if (savedFormData) {
        setFormData(JSON.parse(savedFormData));
        console.log("Restored form data from localStorage:", JSON.parse(savedFormData));
      }

      // Check if Instagram returned a code
      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get('code');

      console.log("Instagram Code from URL:", code); // Log the code from URL

      if (code) {
        setIsLoading(true);
        axios.get(`https://micromatch-backend.onrender.com/api/influencers/verify-instagram?code=${code}`)
          .then(res => {
            console.log("Instagram Verification Response:", res); // Log the response

            if (res.data.success) {
              setAllowPermission(true);
              setAccessToken(res.data.access_token);
              setInstagramId(res.data.insta_scoped_id);
              alert("✅ Instagram verified successfully");
            } else {
              setErrors(prev => ({...prev, instagram: "Instagram verification failed"}));
              alert("Instagram verification failed. Please try again.");
            }
          })
          .catch(err => {
            console.error("Error verifying Instagram:", err); // Log the error
            setErrors(prev => ({...prev, instagram: "Error connecting to Instagram"}));
            alert("Error connecting Instagram. Please try again.");
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  }, []);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.gmail.trim()) tempErrors.gmail = "Email is required";
    if (!formData.password.trim()) tempErrors.password = "Password is required";
    if (!formData.category.trim()) tempErrors.category = "Category is required";
    if (!formData.instaId.trim()) tempErrors.instaId = "Instagram username is required";
    if (!formData.contactNo.trim()) tempErrors.contactNo = "Contact number is required";
    if (!formData.pincode.trim()) tempErrors.pincode = "Pincode is required";
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
    try {
      localStorage.setItem('influencerFormData', JSON.stringify(updatedFormData));
      console.log("Updated Form Data saved to localStorage:", updatedFormData);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  const handleInstagramAuth = () => {
    // Save form data before redirecting
    try {
      localStorage.setItem('influencerFormData', JSON.stringify(formData));
      console.log("Form data saved before Instagram redirect:", formData);
      
      console.log("Redirecting to Instagram for authentication...");
      window.location.href = `https://api.instagram.com/oauth/authorize?client_id=847228190287555&redirect_uri=https://micromatch-frontend.onrender.com/influencer-signin&scope=user_profile,user_media&response_type=code`;
    } catch (error) {
      console.error("Error before Instagram redirect:", error);
      alert("Error connecting to Instagram. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted, Validating...");
    console.log("Current form data:", formData);
    console.log("Instagram connection status:", allowPermission);
    console.log("Access token:", accessToken ? "Present" : "Missing");

    if (validate()) {
      console.log("Validation Passed, Submitting Form...");
      setIsLoading(true);

      try {
        const requestBody = {
          name: formData.name,
          gmail: formData.gmail,
          contactNo: formData.contactNo,
          instaId: formData.instaId,
          youtubeChannel: formData.youtubeChannel,
          pincode: formData.pincode,
          category: formData.category,
          password: formData.password,
          access_token: accessToken,
          insta_scoped_id: instagramId
        };
        
        console.log("Sending request with body:", requestBody);
        
        const res = await axios.post("https://micromatch-backend.onrender.com/api/influencers/register", requestBody);

        console.log("Sign-Up Response:", res); // Log the response

        if (res.data.success) {
          alert("✅ Signup successful!");
          // Clear localStorage saved form data
          localStorage.removeItem('influencerFormData');
          navigate("/login");
        } else {
          alert(`Signup failed: ${res.data.message || "Please try again."}`);
        }
      } catch (err) {
        console.error("Signup error:", err);
        alert(`Signup error: ${err.response?.data?.message || "Please try again later."}`);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Validation Failed");
      alert("❌ Please fix the form errors before submitting.");
    }
  };

  return (
    <div className="influencer-signin-container">
      <h2>Influencer Sign Up</h2>
      {isLoading && <div className="loading">Processing... Please wait</div>}
      
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
          name="gmail"
          placeholder="Email"
          value={formData.gmail}
          onChange={handleChange}
        />
        {errors.gmail && <span className="error">{errors.gmail}</span>}

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
          name="contactNo"
          placeholder="Contact Number"
          value={formData.contactNo}
          onChange={handleChange}
        />
        {errors.contactNo && <span className="error">{errors.contactNo}</span>}

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
        />
        {errors.pincode && <span className="error">{errors.pincode}</span>}

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
          name="instaId"
          placeholder="Instagram Username"
          value={formData.instaId}
          onChange={handleChange}
        />
        {errors.instaId && <span className="error">{errors.instaId}</span>}

        <input
          type="text"
          name="youtubeChannel"
          placeholder="YouTube Channel (Optional)"
          value={formData.youtubeChannel}
          onChange={handleChange}
        />

        <button
          type="button"
          className={`connect-button ${allowPermission ? "connected" : ""}`}
          onClick={handleInstagramAuth}
          disabled={isLoading}
        >
          {allowPermission ? "Connected ✅" : "Connect with Instagram"}
        </button>
        {errors.permission && <span className="error">{errors.permission}</span>}
        {errors.instagram && <span className="error">{errors.instagram}</span>}

        <button
          type="submit"
          className={`signup-button ${allowPermission ? "" : "disabled"}`}
          disabled={!allowPermission || isLoading}
        >
          {isLoading ? "Processing..." : "Sign Up"}
        </button>
      </form>

      <p>Already have an account? <Link to="/influencer-login">Login</Link></p>
    </div>
  );
};

export default InfluencerSignIn;
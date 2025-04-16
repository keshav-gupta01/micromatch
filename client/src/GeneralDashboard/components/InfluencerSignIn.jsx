import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function InfluencerSignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    gmail: '',
    contactNo: '',
    instaId: '',
    youtubeChannel: '',
    pincode: '',
    category: ''
  });

  const [errors, setErrors] = useState({});
  const [allowPermission, setAllowPermission] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [instagramId, setInstagramId] = useState(null);

  const categories = [
    "Fashion & Style", "Beauty & Makeup", "Travel & Adventure", "Fitness & Health",
    "Food & Cooking", "Technology & Gadgets", "Gaming", "Education & Learning",
    "Entertainment & Comedy", "Business & Entrepreneurship", "Lifestyle", "Other"
  ];

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');
  
    if (code) {
      axios
        .get(`http://localhost:5000/api/influencers/verify-instagram?code=${code}`, {
          withCredentials: true, // include cookies if using JWT in cookies
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // if using token in headers
          }
        })
        .then(res => {
          if (res.data.success) {
            setAllowPermission(true);
            alert("✅ Instagram verified successfully");
          } else {
            alert("Instagram verification failed");
          }
        })
        .catch(err => {
          console.error("Error verifying Instagram:", err);
          alert("Error connecting Instagram. Please try again.");
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.gmail) newErrors.gmail = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.gmail)) newErrors.gmail = "Email is invalid";
    if (!formData.contactNo) newErrors.contactNo = "Contact number is required";
    else if (!/^\d{10}$/.test(formData.contactNo)) newErrors.contactNo = "Contact must be 10 digits";
    if (!formData.instaId) newErrors.instaId = "Instagram ID is required";
    if (!formData.youtubeChannel) newErrors.youtubeChannel = "YouTube channel link is required";
    if (!formData.pincode) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Pincode must be 6 digits";
    if (!formData.category) newErrors.category = "Please select a category";
    return newErrors;
  };

  const handleConnectInstagram = () => {
    // Change this to your Flask server's Instagram authorization route
    window.location.href = "https://micromatch-flask-server.onrender.com/server/login";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!allowPermission || !accessToken || !instagramId) {
      alert("Please connect Instagram to continue.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/influencers/register', {
        ...formData,
        accessToken,
        instagramId
      });

      alert("Sign-in successful!");
      navigate('/influencer-dashboard');
    } catch (err) {
      console.error(err);
      alert("Sign-in failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Gradient Backgrounds */}
      <div className="absolute z-0 w-40 h-40 top-0 right-20 blue__gradient"></div>
      <div className="absolute z-0 w-80 h-80 bottom-40 right-20 pink__gradient"></div>
      <div className="absolute z-0 w-40 h-40 bottom-20 left-20 white__gradient"></div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-xl p-8 box-shadow">
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text">
            Influencer Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form Fields */}
            {["name", "gmail", "contactNo", "instaId", "youtubeChannel", "pincode"].map(field => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-800 mb-1">
                  {field === "gmail" ? "Email Address" :
                   field === "contactNo" ? "Contact Number" :
                   field === "instaId" ? "Instagram ID" :
                   field === "youtubeChannel" ? "YouTube Channel" :
                   field === "pincode" ? "Pincode" : "Full Name"}
                </label>
                <input
                  type={field === "gmail" ? "email" : field === "youtubeChannel" ? "url" : "text"}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder={
                    field === "youtubeChannel"
                      ? "https://youtube.com/..."
                      : field === "instaId"
                      ? "your_instagram_handle"
                      : ""
                  }
                  maxLength={field === "contactNo" ? 10 : field === "pincode" ? 6 : undefined}
                />
                {errors[field] && <p className="mt-1 text-sm text-red-500">{errors[field]}</p>}
              </div>
            ))}

            {/* Category Dropdown */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-800 mb-1">
                Category of Influencer
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select your category</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
            </div>

            {/* Instagram Connect Button */}
            <div className="pt-2">
              {!allowPermission ? (
                <button
                  type="button"
                  onClick={handleConnectInstagram}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-400 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90"
                >
                  Connect Instagram
                </button>
              ) : (
                <p className="text-green-600 font-semibold text-sm">✅ Instagram Connected</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={!allowPermission}
                className={`w-full font-bold py-3 px-6 rounded-lg transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${allowPermission
                    ? 'bg-gradient-to-r from-blue-400 to-cyan-300 text-black hover:opacity-90 focus:ring-blue-400'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                `}
              >
                Sign In as Influencer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

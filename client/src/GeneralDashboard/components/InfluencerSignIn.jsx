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
    console.log(code)

    if (code) {
      axios
        .get(`https://micromatch-backend.onrender.com/api/influencers/verify-instagram?code=${code}`, {
          headers: {
            headers: {'x-auth-token': localStorage.getItem('token')}
          }
        })
        .then(res => {
          if (res.data.success) {
            setAllowPermission(true);
            setAccessToken(res.data.accessToken);
            setInstagramId(res.data.instagramId);
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
    if (!formData.youtubeChannel) newErrors.youtubeChannel = "YouTube channel is required";
    if (!formData.pincode) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Pincode must be 6 digits";
    if (!formData.category) newErrors.category = "Please select a category";
    return newErrors;
  };

  const handleConnectInstagram = () => {
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
      const res = await axios.post('https://micromatch-backend.onrender.com/api/influencers/register', {
        ...formData,
        accessToken,
        instagramId
      }, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });

      alert("Sign-in successful!");
      setFormData({
        name: '',
        gmail: '',
        contactNo: '',
        instaId: '',
        youtubeChannel: '',
        pincode: '',
        category: ''
      });
      setErrors({});
      navigate('/influencer-dashboard');
    } catch (err) {
      console.error(err);
      alert("Sign-in failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text">
          Influencer Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {["name", "gmail", "contactNo", "instaId", "youtubeChannel", "pincode"].map(field => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor={field}>
                {field === "gmail" ? "Email Address" :
                  field === "contactNo" ? "Contact Number" :
                  field === "instaId" ? "Instagram ID" :
                  field === "youtubeChannel" ? "YouTube Channel" :
                  field === "pincode" ? "Pincode" : "Full Name"}
              </label>
              <input
                type={field === "gmail" ? "email" : field === "youtubeChannel" ? "url" : "text"}
                name={field}
                id={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                aria-describedby={`${field}-error`}
                required
              />
              {errors[field] && <p id={`${field}-error`} className="text-sm text-red-500">{errors[field]}</p>}
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300"
              aria-describedby="category-error"
              required
            >
              <option value="">Select your category</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p id="category-error" className="text-sm text-red-500">{errors.category}</p>}
          </div>

          <div className="pt-2">
            {!allowPermission ? (
              <button
                type="button"
                onClick={handleConnectInstagram}
                className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg"
                aria-label="Connect Instagram"
              >
                Connect Instagram
              </button>
            ) : (
              <p className="text-green-600 font-semibold text-sm">✅ Instagram Connected</p>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={!allowPermission}
              className={`w-full font-bold py-3 rounded-lg ${allowPermission ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              aria-label="Submit the form to sign in as influencer"
            >
              Sign In as Influencer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

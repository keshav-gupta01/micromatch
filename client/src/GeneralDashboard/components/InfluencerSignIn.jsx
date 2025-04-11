import React, { useState } from 'react';

export default function InfluencerSignIn() {
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

  const categories = [
    "Fashion & Style",
    "Beauty & Makeup",
    "Travel & Adventure",
    "Fitness & Health",
    "Food & Cooking",
    "Technology & Gadgets",
    "Gaming",
    "Education & Learning",
    "Entertainment & Comedy",
    "Business & Entrepreneurship",
    "Lifestyle",
    "Other"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.gmail) newErrors.gmail = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.gmail)) newErrors.gmail = "Email is invalid";
    if (!formData.contactNo) newErrors.contactNo = "Contact number is required";
    else if (!/^\d{10}$/.test(formData.contactNo)) newErrors.contactNo = "Contact number must be 10 digits";
    if (!formData.instaId) newErrors.instaId = "Instagram ID is required";
    if (!formData.youtubeChannel) newErrors.youtubeChannel = "YouTube channel link is required";
    if (!formData.pincode) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Pincode must be 6 digits";
    if (!formData.category) newErrors.category = "Please select a category";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!allowPermission) {
      alert("Please allow permission from Instagram to continue.");
      return;
    }

    setErrors({});
    console.log("Form submitted:", formData);
    alert("Sign-in successful! Welcome to our influencer network.");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute z-0 w-40 h-40 top-0 right-20 blue__gradient"></div>
      <div className="absolute z-0 w-80 h-80 bottom-40 right-20 pink__gradient"></div>
      <div className="absolute z-0 w-40 h-40 bottom-20 left-20 white__gradient"></div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-xl p-8 box-shadow">
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text">
            Influencer Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your full name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="gmail" className="block text-sm font-medium text-gray-800 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="gmail"
                name="gmail"
                value={formData.gmail}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="example@gmail.com"
              />
              {errors.gmail && <p className="mt-1 text-sm text-red-500">{errors.gmail}</p>}
            </div>

            {/* Contact Number */}
            <div>
              <label htmlFor="contactNo" className="block text-sm font-medium text-gray-800 mb-1">
                Contact Number
              </label>
              <input
                type="tel"
                id="contactNo"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="10-digit mobile number"
                maxLength="10"
              />
              {errors.contactNo && <p className="mt-1 text-sm text-red-500">{errors.contactNo}</p>}
            </div>

            {/* Instagram ID */}
            <div>
              <label htmlFor="instaId" className="block text-sm font-medium text-gray-800 mb-1">
                Instagram ID
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 py-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 text-gray-600">
                  @
                </span>
                <input
                  type="text"
                  id="instaId"
                  name="instaId"
                  value={formData.instaId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-r-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="your_instagram_handle"
                />
              </div>
              {errors.instaId && <p className="mt-1 text-sm text-red-500">{errors.instaId}</p>}
            </div>

            {/* YouTube Channel */}
            <div>
              <label htmlFor="youtubeChannel" className="block text-sm font-medium text-gray-800 mb-1">
                YouTube Channel Link
              </label>
              <input
                type="url"
                id="youtubeChannel"
                name="youtubeChannel"
                value={formData.youtubeChannel}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="https://youtube.com/c/yourchannel"
              />
              {errors.youtubeChannel && <p className="mt-1 text-sm text-red-500">{errors.youtubeChannel}</p>}
            </div>

            {/* Pincode */}
            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-800 mb-1">
                Pincode
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="6-digit pincode"
                maxLength="6"
              />
              {errors.pincode && <p className="mt-1 text-sm text-red-500">{errors.pincode}</p>}
            </div>

            {/* Category */}
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
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
            </div>

            {/* Allow Instagram Permission */}
            <div className="flex items-center space-x-3 pt-2">
              <input
                type="checkbox"
                id="allowPermission"
                checked={allowPermission}
                onChange={(e) => setAllowPermission(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="allowPermission" className="text-sm text-gray-700">
                Allow permission from Instagram
              </label>
            </div>

            {/* Submit */}
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


// Dummy Sign in code, use to go to influencer dashboard
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// const SignupPage = () => {
//   const navigate = useNavigate();

//   const handleDummySignup = () => {
//     // Simulate successful signup and redirect
//     navigate('../influencer-dashboard');
//   };

//   return (
//     <div style={{ textAlign: 'center', marginTop: '100px' }}>
//       <h1>Dummy Signup Page</h1>
//       <p>Click the button below to simulate signup and go to Influencer Dashboard</p>
//       <button 
//         onClick={handleDummySignup} 
//         style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
//       >
//         Sign Up
//       </button>
//       <div className="login-link">
//                 Go to influencer dashboard? <Link to="/influencer-dashboard">Press Here</Link>
//              </div>
//     </div>
//   );
// };

// export default SignupPage;
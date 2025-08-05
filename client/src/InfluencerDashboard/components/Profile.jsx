import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaEnvelope, FaUserEdit, FaSpinner } from 'react-icons/fa';

const InfluencerProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Get influencer ID from localStorage or context
  const influencerId = localStorage.getItem('influencerId');
  
  const [formData, setFormData] = useState({
    profilePicture: '',
    name: '',
    instaId: '',
    bio: '',
    gmail: '',
    contactNo: '',
    youtubeChannel: '',
    pincode: '',
    category: ''
  });

  const [originalData, setOriginalData] = useState({});

  // Categories for dropdown
  const categories = [
    "Fashion & Style", "Beauty & Makeup", "Travel & Adventure", "Fitness & Health",
    "Food & Cooking", "Technology & Gadgets", "Gaming", "Education & Learning",
    "Entertainment & Comedy", "Business & Entrepreneurship", "Lifestyle", "Other"
  ];

  // Fetch influencer profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      
      // Check if influencerId exists
      if (!influencerId || influencerId === 'null') {
        setError('Influencer ID not found. Please log in again.');
        setLoading(false);
        // Fallback to sample data for demo
        const sampleData = {
          profilePicture: 'https://res.cloudinary.com/dmlzftk1w/image/upload/v1753626484/campaign_media/nrz9jf315akgnhtxln5n.png',
          name: 'Jane Doe',
          instaId: '@janedoe',
          bio: 'Lifestyle and travel influencer. Exploring the world and sharing my adventures.',
          gmail: 'jane.doe@example.com',
          contactNo: '+1234567890',
          youtubeChannel: 'Jane Doe Vlogs',
          pincode: '12345',
          category: 'Lifestyle'
        };
        setFormData(sampleData);
        setOriginalData(sampleData);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found');
        }

        const response = await fetch(`https://micromatch-backend-gpchh5eudjfmdqa2.centralindia-01.azurewebsites.net/api/influencers/${influencerId}`, {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized. Please log in again.');
          }
          if (response.status === 404) {
            throw new Error('Influencer profile not found');
          }
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
          const profile = data.influencer;
          const profileData = {
            profilePicture: profile.profilePicture || '',
            name: profile.name || '',
            instaId: profile.instaId || '',
            bio: profile.bio || '',
            gmail: profile.gmail || '',
            contactNo: profile.contactNo || '',
            youtubeChannel: profile.youtubeChannel || '',
            pincode: profile.pincode || '',
            category: profile.category || ''
          };
          setFormData(profileData);
          setOriginalData(profileData);
        } else {
          throw new Error(data.message || 'Failed to fetch profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError(error.message || 'Failed to load profile. Please try again.');
        // Fallback to sample data for demo
        const sampleData = {
          profilePicture: 'https://res.cloudinary.com/dmlzftk1w/image/upload/v1753626484/campaign_media/nrz9jf315akgnhtxln5n.png',
          name: 'Jane Doe',
          instaId: '@janedoe',
          bio: 'Lifestyle and travel influencer. Exploring the world and sharing my adventures.',
          gmail: 'jane.doe@example.com',
          contactNo: '+1234567890',
          youtubeChannel: 'Jane Doe Vlogs',
          pincode: '12345',
          category: 'Lifestyle'
        };
        setFormData(sampleData);
        setOriginalData(sampleData);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [influencerId]);

const handleSubmit = async (e) => {
  e.preventDefault();
  setSaving(true);
  setError(null);
  setSuccess(null);

  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication token not found');

    const formDataForSubmit = new FormData();
    formDataForSubmit.append('name', formData.name);
    formDataForSubmit.append('instaId', formData.instaId);
    formDataForSubmit.append('bio', formData.bio);
    formDataForSubmit.append('gmail', formData.gmail);
    formDataForSubmit.append('contactNo', formData.contactNo);
    formDataForSubmit.append('youtubeChannel', formData.youtubeChannel);
    formDataForSubmit.append('pincode', formData.pincode);
    formDataForSubmit.append('category', formData.category);

    if (formData.profileFile) {
      formDataForSubmit.append('profilePicture', formData.profileFile); // <--- key matches multer
    }

    const response = await fetch(`https://micromatch-backend-gpchh5eudjfmdqa2.centralindia-01.azurewebsites.net/api/influencers/${influencerId}`, {
      method: 'PUT',
      headers: { 'x-auth-token': token }, // don't set Content-Type for FormData
      body: formDataForSubmit,
    });

    const data = await response.json();
    if (data.success) {
      setSuccess('Profile updated successfully!');
      setOriginalData(formData);
      setTimeout(() => navigate('/influencer-dashboard'), 2000);
    } else {
      throw new Error(data.message || 'Failed to update profile');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    setError(error.message || 'Failed to update profile. Please try again.');
  } finally {
    setSaving(false);
  }
};


const handleChange = (e) => {
  const { name, value, files } = e.target;
  
  if (name === 'profilePicture' && files.length > 0) {
    const file = files[0];

    // Optional: validate file
    if (!file.type.startsWith('image/')) {
      alert('Only image files allowed');
      return;
    }

    // Show local preview
    const previewUrl = URL.createObjectURL(file);

    // Store preview + file
    setFormData((prev) => ({
      ...prev,
      profilePicture: previewUrl, // local preview
      profileFile: file           // raw file for FormData
    }));
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
};


  const handleCancel = () => {
    setFormData(originalData);
    setError(null);
    setSuccess(null);
    navigate('/influencer-dashboard');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#104581]"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#f0f4f8] to-white min-h-screen">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <FaUserEdit className="text-[#104581]" /> Influencer Profile
          </h2>
          <p className="text-gray-500 text-sm mt-1">Keep your profile updated to connect better with brands.</p>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        {/* Profile Picture Preview */}
        <div className="flex flex-col items-center gap-4">
          {formData.profilePicture ? (
            <img
              src={formData.profilePicture}
              alt="Profile"
              className="h-32 w-32 rounded-full object-cover border-4 border-[#104581] shadow-lg"
            />
          ) : (
            <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm border-4 border-gray-300">
              No Image
            </div>
          )}
          <div className="text-center">
            <label htmlFor="profilePicture" className="cursor-pointer bg-[#104581] hover:bg-[#0d3766] text-white px-4 py-2 rounded-lg text-sm transition-colors">
              Change Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
            <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField 
            label="Full Name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required
          />
          
          <InputField 
            label="Instagram Username" 
            name="instaId" 
            value={formData.instaId} 
            onChange={handleChange}
            icon={<FaInstagram className="text-pink-500" />}
            required
          />

          <div className="md:col-span-2">
            <TextAreaField 
              label="Bio" 
              name="bio" 
              value={formData.bio} 
              onChange={handleChange}
              placeholder="Tell brands about yourself and your content style..."
            />
          </div>

          <InputField
            label="Email"
            name="gmail"
            value={formData.gmail}
            type="email"
            onChange={handleChange}
            icon={<FaEnvelope className="text-gray-500" />}
            required
          />

          <InputField 
            label="Contact Number" 
            name="contactNo" 
            value={formData.contactNo} 
            onChange={handleChange}
            type="tel"
            required
          />

          <InputField 
            label="YouTube Channel" 
            name="youtubeChannel" 
            value={formData.youtubeChannel} 
            onChange={handleChange}
            placeholder="Optional"
          />

          <InputField 
            label="Pincode" 
            name="pincode" 
            value={formData.pincode} 
            onChange={handleChange}
            placeholder="Your location pincode"
          />

          <div className="md:col-span-2">
            <SelectField
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={categories}
              required
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-[#104581] hover:bg-[#0d3766] text-white font-semibold py-2 px-8 rounded-lg shadow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {saving && <FaSpinner className="animate-spin mr-2" />}
              {saving ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable input component
const InputField = ({ label, name, value, onChange, icon = null, type = 'text', required = false, placeholder = "" }) => (
  <div>
    <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative flex items-center">
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#104581] focus:border-transparent bg-white transition-colors`}
      />
      {icon && (
        <div className="absolute left-3 text-gray-400">
          {icon}
        </div>
      )}
    </div>
  </div>
);

// Reusable textarea component
const TextAreaField = ({ label, name, value, onChange, required = false, placeholder = "" }) => (
  <div>
    <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      rows="4"
      className="w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#104581] focus:border-transparent bg-white resize-none transition-colors"
    />
  </div>
);

// Reusable select component
const SelectField = ({ label, name, value, onChange, options, required = false }) => (
  <div>
    <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#104581] focus:border-transparent bg-white transition-colors"
    >
      <option value="">Select a category</option>
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

export default InfluencerProfile;
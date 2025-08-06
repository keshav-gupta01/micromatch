import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaBuilding, FaEnvelope, FaGlobe, FaSpinner } from 'react-icons/fa';

const BusinessProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    logo: '',
    logoFile: null,
    businessName: '',
    website: '',
    industry: '',
    description: '',
    email: '',
  });

  const [originalData, setOriginalData] = useState({});

  const industryOptions = [
    "Fashion & Apparel", "Beauty & Cosmetics", "Food & Beverage", "Technology",
    "Health & Fitness", "Travel & Hospitality", "Entertainment", "Education",
    "Finance", "Retail", "Other"
  ];

  // Fetch business profile
  useEffect(() => {
    const fetchBusinessProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Authentication token not found');

        const response = await axios.get('https://micromatch-backend.onrender.com/api/brands/getprofile', {
          headers: { 'x-auth-token': token },
        });

        const data = response.data || {};
        const profileData = {
          logo: data.logo || '',
          businessName: data.businessName || '',
          website: data.website || '',
          industry: data.industry || '',
          description: data.description || '',
          email: data.email || '',
          logoFile: null
        };

        setFormData(profileData);
        setOriginalData(profileData);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setError(error.message || 'Failed to fetch profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessProfile();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'logoFile' && files && files[0]) {
      const file = files[0];
      if (!file.type.startsWith('image/')) {
        alert('Only image files allowed');
        return;
      }
      setFormData((prev) => ({
        ...prev,
        logo: URL.createObjectURL(file),
        logoFile: file,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found');

      const form = new FormData();
      form.append('businessName', formData.businessName);
      form.append('website', formData.website);
      form.append('industry', formData.industry);
      form.append('description', formData.description);
      form.append('email', formData.email);

      if (formData.logoFile) {
        form.append('brand_logo', formData.logoFile); // backend expects brand_logo
      }

      const response = await axios.post('https://micromatch-backend.onrender.com/api/brands/update', form, {
        headers: { 'x-auth-token': token },
      });

      if (response.data.success) {
        setSuccess('Profile updated successfully!');
        setOriginalData(formData);
        setTimeout(() => navigate('/business-dashboard'), 1500);
      } else {
        throw new Error(response.data.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setError(null);
    setSuccess(null);
    navigate('/business-dashboard');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#104581]"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#eef2f7] to-white min-h-screen">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <FaBuilding className="text-[#104581]" /> Business Profile
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Update your business details to attract the right influencers.
          </p>
        </div>

        {/* Status messages */}
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

        {/* Logo preview and upload */}
        <div className="flex flex-col items-center gap-4">
          {formData.logo ? (
            <img
              src={formData.logo}
              alt="Business Logo"
              className="h-24 w-24 rounded-full object-cover border-4 border-[#104581]"
            />
          ) : (
            <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
              No Logo
            </div>
          )}

          <label className="cursor-pointer bg-[#104581] hover:bg-[#0d3766] text-white px-4 py-2 rounded-lg text-sm">
            Change Logo
            <input
              type="file"
              name="logoFile"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
          </label>
          <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
          <InputField label="Business Name" name="businessName" value={formData.businessName} onChange={handleChange} required />
          <InputField label="Website" name="website" value={formData.website} onChange={handleChange} icon={<FaGlobe className="text-blue-500 ml-1" />} />
          
          <div>
            <label htmlFor="industry" className="block text-gray-700 font-medium mb-2">
              Industry <span className="text-red-500">*</span>
            </label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#104581] focus:border-transparent bg-white"
            >
              <option value="">Select an industry</option>
              {industryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <TextAreaField label="Description" name="description" value={formData.description} onChange={handleChange} />
          <InputField label="Contact Email" name="email" type="email" value={formData.email} onChange={handleChange} icon={<FaEnvelope className="text-gray-500" />} />

          <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
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
              className="bg-[#104581] hover:bg-[#0d3766] text-white font-semibold py-2 px-8 rounded-lg shadow transition-all duration-200 disabled:opacity-50 flex items-center"
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

// Reusable components
const InputField = ({ label, name, value, onChange, icon = null, type = 'text', required = false }) => (
  <div>
    <label htmlFor={name} className="block text-gray-700 font-medium mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {icon && <span className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</span>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#104581] focus:border-transparent bg-white`}
      />
    </div>
  </div>
);

const TextAreaField = ({ label, name, value, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-gray-700 font-medium mb-1">{label}</label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      rows="4"
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#104581] focus:border-transparent bg-white resize-none"
    />
  </div>
);

export default BusinessProfile;

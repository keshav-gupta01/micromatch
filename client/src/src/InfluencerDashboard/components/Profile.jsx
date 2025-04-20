import React, { useState } from 'react';

const BusinessProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    businessName: 'Tech Solutions Inc.',
    industry: 'Technology',
    contactEmail: 'contact@techsolutions.com',
    phoneNumber: '123-456-7890',
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateClick = () => {
    console.log('Updated Profile:', formData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Business Profile</h1>

      {!isEditing ? (
        <div className="flex flex-col items-center justify-center">
          <div className="bg-gray-100 rounded-lg p-4 mb-4 w-full md:w-1/2">
            <p className="text-gray-700">
              <span className="font-semibold">Business Name:</span> {formData.businessName}
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 mb-4 w-full md:w-1/2">
            <p className="text-gray-700">
              <span className="font-semibold">Industry:</span> {formData.industry}
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 mb-4 w-full md:w-1/2">
            <p className="text-gray-700">
              <span className="font-semibold">Contact Email:</span> {formData.contactEmail}
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 mb-4 w-full md:w-1/2">
            <p className="text-gray-700">
              <span className="font-semibold">Phone Number:</span> {formData.phoneNumber}
            </p>
          </div>
          <button
            onClick={handleEditClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Edit
          </button>
        </div>
      ) : (
        <div className="w-full md:w-1/2">
          <div className="mb-4">
            <label htmlFor="businessName" className="block text-gray-700 text-sm font-bold mb-2">
              Business Name
            </label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="industry" className="block text-gray-700 text-sm font-bold mb-2">
              Industry
            </label>
            <input
              type="text"
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contactEmail" className="block text-gray-700 text-sm font-bold mb-2">
              Contact Email
            </label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            onClick={handleUpdateClick}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default BusinessProfile;
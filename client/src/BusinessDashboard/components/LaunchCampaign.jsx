import React, { useState } from 'react';

const LaunchCampaign = () => {
  const [campaignLogo, setCampaignLogo] = useState(null);
  const [hashtags, setHashtags] = useState('');
  const [budget, setBudget] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [location, setLocation] = useState('');
  const [products, setProducts] = useState([{ name: '', price: '' }]);

  const handleLogoChange = (event) => {
    setCampaignLogo(event.target.files[0]);
  };

  const handleHashtagsChange = (event) => {
    setHashtags(event.target.value);
  };

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  const handleAgeGroupChange = (event) => {
    setAgeGroup(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleProductChange = (index, event) => {
    const newProducts = [...products];
    newProducts[index][event.target.name] = event.target.value;
    setProducts(newProducts);
  };

  const addProduct = () => {
    setProducts([...products, { name: '', price: '' }]);
  };

  const removeProduct = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', {
      campaignLogo,
      hashtags,
      budget,
      ageGroup,
      location,
      products,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label htmlFor="campaignLogo" className="block text-sm font-medium text-gray-700">
          Campaign Logo
        </label>
        <input
          type="file"
          id="campaignLogo"
          onChange={handleLogoChange}
          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="hashtags" className="block text-sm font-medium text-gray-700">
          Hashtags (comma-separated)
        </label>
        <input
          type="text"
          id="hashtags"
          value={hashtags}
          onChange={handleHashtagsChange}
          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
          Budget
        </label>
        <input
          type="number"
          id="budget"
          value={budget}
          onChange={handleBudgetChange}
          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="ageGroup" className="block text-sm font-medium text-gray-700">
          Audience Age Group
        </label>
        <select
          id="ageGroup"
          value={ageGroup}
          onChange={handleAgeGroupChange}
          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        >
          <option value="">Select Age Group</option>
          <option value="13-17">13-17</option>
          <option value="18-24">18-24</option>
          <option value="25-34">25-34</option>
          <option value="35-44">35-44</option>
          <option value="45+">45+</option>
        </select>
      </div>
      </div>

        <div>
      
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Audience Location
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={handleLocationChange}
          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
       <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Products</h4>
       
        {products.map((product, index) => (
          <div key={index} className="flex space-x-4 items-center">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={(event) => handleProductChange(index, event)}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={product.price}
              onChange={(event) => handleProductChange(index, event)}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            {products.length > 1 && (
              <button
                type="button"
                onClick={() => removeProduct(index)}
                className="mt-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addProduct}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Product
        </button>
      </div>

      <div>
        <button
          type="submit"
          className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default LaunchCampaign;
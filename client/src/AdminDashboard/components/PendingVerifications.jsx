import React from 'react';

function PendingVerifications() {
  const brands = [
    {
      name: "Masala Trails Cafe",
      socialMedia: ["https://instagram.com/masalatrailscafe", "https://facebook.com/masalatrailscafe"],
      email: "branda@example.com",
      phone: "+1-123-456-7890",
    },
    {
      name: "Nexora Tech",
      socialMedia: ["https://twitter.com/nexoratech", "https://linkedin.com/company/nexoratech"],
      email: "brandb@example.com",
      phone: "+1-987-654-3210",
    },
    {
      name: "FabIndia",
      socialMedia: ["https://instagram.com/fabndia"],
      email: "brandc@example.com",
      phone: "+1-555-123-4567",
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Pending Verifications</h3>
      <ul className="space-y-4">
        {brands.map((brand, index) => (
          <li key={index} className="border border-gray-300 rounded-lg p-4 flex justify-between items-center">
            <div className="flex-grow">
              <p className="font-bold">{brand.name}</p>
              {brand.socialMedia.map((link, i) => (
                <p key={i}>{link}</p>
              ))}
              <p>Official Email: {brand.email}</p>
              <p>Phone: {brand.phone}</p>
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Confirm
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default PendingVerifications;

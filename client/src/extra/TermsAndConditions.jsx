import { useState } from 'react';

export default function TermsAndConditions() {
  const [expanded, setExpanded] = useState({});

  const toggleSection = (section) => {
    setExpanded({
      ...expanded,
      [section]: !expanded[section]
    });
  };

  const sections = [
    {
      id: 'definitions',
      title: '1. Definitions',
      content: [
        '"Platform" refers to the MicroMatch website and related services.',
        '"User" means any individual or entity who creates an account on MicroMatch, including both Influencers and Brands.',
        '"Campaign" means any marketing opportunity posted by a Brand on the Platform.',
        '"Influencer" refers to a user who applies to participate in Campaigns.',
        '"Brand" refers to a user who posts Campaigns and collaborates with Influencers.'
      ]
    },
    {
      id: 'eligibility',
      title: '2. Eligibility',
      content: [
        'You must be at least 18 years old and capable of entering into a binding agreement.',
        'By registering on the Platform, you confirm that all information provided is accurate and up to date.'
      ]
    },
    {
      id: 'accounts',
      title: '3. User Accounts',
      content: [
        'Users must create an account to access features.',
        'You are responsible for maintaining the confidentiality of your login credentials.',
        'MicroMatch reserves the right to suspend or terminate accounts that violate these Terms.'
      ]
    },
    {
      id: 'platform-use',
      title: '4. Platform Use',
      content: [
        'For Brands:',
        '• Brands can post Campaigns specifying objectives, deliverables, timelines, and payment terms.',
        '• Brands are solely responsible for the content, legality, and terms of their Campaigns.',
        'For Influencers:',
        '• Influencers may apply to Campaigns and, if selected, must complete deliverables as agreed.',
        '• Influencers must ensure that content is original, follows the Campaign brief, and complies with applicable laws and platform guidelines (e.g., FTC guidelines).'
      ]
    },
    {
      id: 'payments',
      title: '5. Payments and Fees',
      content: [
        'MicroMatch may charge service fees, which will be disclosed prior to transactions.',
        'Payment terms (e.g., payment method, timeline) are defined per Campaign agreement.',
        'MicroMatch may act as an intermediary for payments but is not responsible for payment disputes unless otherwise stated.'
      ]
    },
    {
      id: 'intellectual-property',
      title: '6. Content and Intellectual Property',
      content: [
        'Users retain ownership of their content but grant MicroMatch a non-exclusive, worldwide, royalty-free license to use, display, and distribute submitted content for platform operations and promotion.',
        'You must not post or share any content that infringes intellectual property rights.'
      ]
    },
    {
      id: 'prohibited-conduct',
      title: '7. Prohibited Conduct',
      content: [
        'Users must not:',
        '• Post false or misleading information.',
        '• Use bots, scrapers, or unauthorized means to access the Platform.',
        '• Harass or abuse other users.',
        '• Circumvent Platform processes, including off-platform payments.'
      ]
    },
    {
      id: 'termination',
      title: '8. Termination',
      content: [
        'MicroMatch reserves the right to suspend or terminate your account at any time for violations of these Terms or for any behavior deemed harmful to the platform or its users.'
      ]
    },
    {
      id: 'disclaimers',
      title: '9. Disclaimers',
      content: [
        'MicroMatch is a marketplace platform and does not guarantee the outcome or success of Campaigns.',
        'We are not liable for any interactions, contracts, or disputes between Users.'
      ]
    },
    {
      id: 'liability',
      title: '10. Limitation of Liability',
      content: [
        'To the fullest extent permitted by law, MicroMatch is not liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform.'
      ]
    },
    {
      id: 'modifications',
      title: '11. Modifications',
      content: [
        'We may update these Terms from time to time. Continued use of the Platform after changes constitutes acceptance of the updated Terms.'
      ]
    },
    {
      id: 'contact',
      title: '12. Contact Us',
      content: [
        'For questions or concerns about these Terms, contact us at:',
        'support@micromatch.com'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-[#96AED0] text-white p-8 rounded-t-lg text-center">
          <h1 className="text-3xl font-bold">Terms and Conditions</h1>
          <p className="mt-2 italic">Last Updated: [Insert Date]</p>
        </div>

        {/* Introduction */}
        <div className="bg-white p-8 shadow-md rounded-b-lg">
          <p className="mb-6">
            Welcome to MicroMatch. These Terms and Conditions ("Terms") govern your access to and use of the MicroMatch platform, which connects brands with influencers for marketing campaigns. By accessing or using our website (the "Platform"), you agree to comply with and be bound by these Terms.
          </p>

          {/* Terms Sections */}
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.id} className="border-b border-gray-200 pb-4">
                <button 
                  onClick={() => toggleSection(section.id)}
                  className="flex justify-between items-center w-full text-left font-medium text-lg py-2 focus:outline-none"
                >
                  <span className="text-[#96AED0]">{section.title}</span>
                  <svg 
                    className={`w-5 h-5 text-[#96AED0] transform ${expanded[section.id] ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {(expanded[section.id] || expanded[section.id] === undefined) && (
                  <div className="mt-3 pl-4 text-gray-700">
                    {section.content.map((paragraph, idx) => (
                      <p key={idx} className="mb-2">{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Contact Information */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border-l-4 border-[#96AED0]">
            <p className="font-semibold">Need help?</p>
            <p>
              If you have any questions about these Terms, please contact us at:
              <span className="block mt-1 text-[#96AED0] font-medium">📧 support@micromatch.com</span>
            </p>
          </div>

          {/* Footer */}
          <div className="mt-10 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} MicroMatch. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}